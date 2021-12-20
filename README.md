# Giveitawaynow Backend

It uses [serverless](https://www.serverless.com) to deploy AWS lambda functions exposed through the AWS API Gateway.

## Local development

The project uses the `serverless-offline` and `serverless-dynamodb-local` plugins to allow for local development.

In order to start serverless locally do the following

```bash
# install the serverless CLI as a global package
npm -g install serverless

# install local dependencies
npm install

# run serverless locally
serverless offline
```

## Testing

```bash
npm run test
```
