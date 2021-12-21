import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

Date.prototype.addHours = function (hours: number) {
  const newDate = new Date(this);
  newDate.setTime(this.getTime() + hours * 60 * 60 * 1000);
  return newDate;
};

export async function handler() {
  const client = new DynamoDBClient({ region: "ap-southeast-2" });

  const params: ScanCommandInput = {
    TableName: "giveitawaynow-items",
  };

  var response = {
    statusCode: 500,
    body: "Could not retrieve items",
    headers: {
      "Access-Control-Allow-Headers" : "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
    },
  };

  const run = async () => {
    try {
      const results = await client.send(new ScanCommand(params));

      response.body = JSON.stringify(
        (results.Items || [])
          .map(function (element, index, array) {
            const item = unmarshall(element);
            console.log(item);
            return item;
          })
          .filter(function (item) {
            const listedTime = new Date(item.listedTime);
            const expiryTime = listedTime.addHours(2);
            const now = new Date();
            console.log("listedDate: " + listedTime);
            console.log("expiryTime: " + expiryTime);
            console.log("now: " + now);

            if (expiryTime < now) {
              return false; // skip old listings
            }

            return true;
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
