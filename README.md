# Product Description Generator

![Product Description Generator Demo](/assets/Product%20Description%20Generator.gif)

This is an ecommerce demo that allows you to upload a product image and get detailed descriptions for it in different languages. Powered by [Together AI](https://dub.sh/together-ai) and [Llama 3.2 Vision](https://dub.sh/llama3.2vision/?utm_source=example-app&utm_medium=pdg&utm_campaign=product-description-generator).

## Tech stack

- [Llama 3.2 Vision](https://dub.sh/llama3.2vision/?utm_source=example-app&utm_medium=pdg&utm_campaign=product-description-generator) from Meta for the Vision model
- [Together AI](https://dub.sh/together-ai) for LLM inference
- [S3](https://aws.amazon.com/s3/) for image storage
- Next.js app router with Tailwind
- Plausible for website analytics

## Cloning & running

1. Clone the repo: `git clone https://github.com/Nutlope/description-generator`
2. Create a `.env` file and add your [Together AI API key](https://dub.sh/llama3.2vision/?utm_source=example-app&utm_medium=napkins&utm_campaign=napkins-app-signup): `TOGETHER_API_KEY=`
3. Create an S3 bucket and add the credentials to your `.env` file. Follow [this guide](https://next-s3-upload.codingvalue.com/setup) to set them up. All required values are in the `.env.example` file.
4. Run `npm install` and `npm run dev` to install dependencies and run locally
