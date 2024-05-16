module "sns_topic" {
  source  = "terraform-aws-modules/sns/aws"
  version = "~> 6.0"

  name         = "tts-website-amplify-new-posts-${random_string.random.result}"
  display_name = "TTS Website New Posts"

  create_subscription = true
  subscriptions = {
    lambda = {
      protocol = "lambda"
      endpoint = module.lambda_convertaudio.lambda_function_arn
    }
  }
}
