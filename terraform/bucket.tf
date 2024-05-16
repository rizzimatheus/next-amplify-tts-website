module "s3_storage" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "~> 4.0"

  bucket                  = "tts-website-amplify-storage-${random_string.random.result}"
  acl                     = "public-read"
  block_public_acls       = false
  ignore_public_acls      = false
  restrict_public_buckets = false

  control_object_ownership = true
  object_ownership         = "ObjectWriter"

  # Allow deletion of non-empty bucket
  force_destroy = true

  versioning = {
    enabled = false
  }
}
