module "lambda_convertaudio" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "~> 7.0"

  function_name          = "tts-website-amplify-convertaudio-${random_string.random.result}"
  description            = "Lambda function to convert new posts to mp3 files"
  handler                = "bootstrap"
  runtime                = "provided.al2023"
  architectures          = ["x86_64"]
  create_package         = false
  local_existing_package = "../lambda/convertaudio/bin/convertaudio.zip"

  timeout = 900
  publish = true

  environment_variables = {
    BUCKET_NAME = module.s3_storage.s3_bucket_id
  }

  allowed_triggers = {
    AllowExecutionFromSNS = {
      principal  = "sns.amazonaws.com"
      source_arn = module.sns_topic.topic_arn
    }
  }

  attach_policy_statements = true
  policy_statements = {
    polly = {
      effect = "Allow",
      actions = [
        "polly:SynthesizeSpeech",
      ],
      resources = [
        "*"
      ]
    },
    dynamodb = {
      effect = "Allow",
      actions = [
        "dynamodb:GetItem",
        "dynamodb:UpdateItem",
      ],
      resources = [
        data.aws_dynamodb_table.dynamodb_public_table.arn,
        data.aws_dynamodb_table.dynamodb_private_table.arn,
      ]
    },
    s3 = {
      effect = "Allow",
      actions = [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetBucketLocation",
      ],
      resources = [
        module.s3_storage.s3_bucket_arn,
        "${module.s3_storage.s3_bucket_arn}/*",
      ]
    }
  }
}

module "lambda_newpost" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "~> 7.0"

  function_name          = "tts-website-amplify-newpost-${random_string.random.result}"
  description            = "Lambda function to handle new posts from DynamoDB Streams"
  handler                = "bootstrap"
  runtime                = "provided.al2023"
  architectures          = ["x86_64"]
  create_package         = false
  local_existing_package = "../lambda/newpost/bin/newpost.zip"

  timeout = 10
  publish = true

  environment_variables = {
    SNS_TOPIC = module.sns_topic.topic_arn
  }

  event_source_mapping = {
    dynamodb_public = {
      event_source_arn           = data.aws_dynamodb_table.dynamodb_public_table.stream_arn
      starting_position          = "LATEST"
      destination_arn_on_failure = module.sqs_failure.queue_arn
      filter_criteria = [
        {
          pattern = jsonencode({
            eventName : ["INSERT"]
          })
        },
      ]
    }
    dynamodb_private = {
      event_source_arn           = data.aws_dynamodb_table.dynamodb_private_table.stream_arn
      starting_position          = "LATEST"
      destination_arn_on_failure = module.sqs_failure.queue_arn
      filter_criteria = [
        {
          pattern = jsonencode({
            eventName : ["INSERT"]
          })
        },
      ]
    }
  }

  allowed_triggers = {
    dynamodb_public = {
      principal  = "dynamodb.amazonaws.com"
      source_arn = data.aws_dynamodb_table.dynamodb_public_table.stream_arn
    },
    dynamodb_private = {
      principal  = "dynamodb.amazonaws.com"
      source_arn = data.aws_dynamodb_table.dynamodb_private_table.stream_arn
    },
  }

  attach_policy_statements = true
  policy_statements = {
    dynamodb = {
      effect = "Allow",
      actions = [
        "dynamodb:GetRecords",
        "dynamodb:GetShardIterator",
        "dynamodb:DescribeStream",
        "dynamodb:ListStreams",
      ],
      resources = [
        data.aws_dynamodb_table.dynamodb_public_table.stream_arn,
        data.aws_dynamodb_table.dynamodb_private_table.stream_arn,
      ]
    },
    sns = {
      effect    = "Allow",
      actions   = ["sns:Publish"],
      resources = [module.sns_topic.topic_arn]
    },
    sqs_failure = {
      effect    = "Allow",
      actions   = ["sqs:SendMessage"],
      resources = [module.sqs_failure.queue_arn]
    },
  }
}

module "sqs_failure" {
  source  = "terraform-aws-modules/sqs/aws"
  version = "~> 4.0"

  name = "tts-website-newpost-amplify-failure-${random_string.random.result}"
}

data "aws_dynamodb_table" "dynamodb_public_table" {
  name = var.dynamodb_public_table
}

data "aws_dynamodb_table" "dynamodb_private_table" {
  name = var.dynamodb_private_table
}
