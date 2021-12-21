import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export async function handler() {
  const client = new DynamoDBClient({ region: "ap-southeast-2" });

  const params: ScanCommandInput = {
    TableName: "giveitawaynow-items",
  };

  var response = {
    statusCode: 500,
    body: "Could not retrieve items",
  };

  const run = async () => {
    try {
      const results = await client.send(new ScanCommand(params));

      response.body = JSON.stringify(
        (results.Items || []).map(function (element, index, array) {
          console.log(unmarshall(element));

          return unmarshall(element);
        }),
        null,
        2
      );
      response.statusCode = 200;
    } catch (err) {
      console.error(err);
    }
  };

  await run();
  return response;
}
