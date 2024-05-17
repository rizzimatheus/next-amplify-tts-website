# AudioNotes V2

AudioNotes is a web application that allows users to convert text into speech. It supports anonymous usage for creating and reading public notes, as well as signed-up users for private notes.

## Demo
Experience the application live [here](https://audionotes.matheusrizzi.com).

## Documentation
For more information, visit the [documentation](https://matheusrizzi.com/projects/en/audionotes).

## Technology Stack
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white)

- **Frontend**: Next.js with TypeScript, Amplify library
- **Hosting**: AWS Amplify
- **Backend**: AWS Cognito, Lambda (Golang), DynamoDB, S3, SNS, SQS, Amazon Polly
- **IaC**: Terraform

## Installation
1. Set up an AWS account and configure AWS credentials on your machine.
2. To run:
   - Locally: execute `npx ampx sandbox`, `npm install` and `npm run dev`.
   - Hosting on Amplify: create a GitHub repository and follow the instructions on the Amplify page in the AWS console.
3. In the AWS console, under the Cognito user pool created by Amplify, add a Cognito domain in the 'App integration' tab to ensure the signup email verification link functions correctly.
4. If you prefer not to host the Terraform backend on S3, you can delete the `backend.tf` file. Alternatively, you can manually create the DynamoDB table and S3 bucket and specify them in this file. For automated resource creation, use the CloudFormation script available [here](https://github.com/rizzimatheus/terraform-backend-aws).
5. Edit `variables.tf` to specify the DynamoDB tables created by Amplify.
6. Run `terraform init` and then `terraform apply`.

## Usage
Access the site via `localhost:3000` when running locally, or use the URL provided by Amplify when hosted there.

## Deletion
To delete the project:
- Run `terraform destroy`.
- If running locally, execute `npx ampx sandbox delete`.
- If hosted on Amplify, delete the Amplify app project using the AWS console.

## AudioNotes V1
For the first version of AudioNotes, please visit the [AudioNotes V1 repository](https://github.com/rizzimatheus/aws-tts-website).

## License
This project is licensed under the MIT License - see the LICENSE file for details.
