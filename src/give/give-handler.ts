import { APIGatewayProxyHandler } from "aws-lambda";
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuid } from "uuid";

interface Item {
  ItemId: string;
  title: string;
  description: string;
  pickupInstructions: string;
  imageUrl: string;
  listedTime: string;
  location: Location;
}

interface Location {
  lat: number;
  lng: number;
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
  var postData: Item = JSON.parse(event.body || "");
  postData.ItemId = uuid();

  const client = new DynamoDBClient({ region: "ap-southeast-2" });

  const params: PutItemCommandInput = {
    TableName: "giveitawaynow-items",
    Item: marshall(postData),
  };

  console.log("Adding a new item...");
  console.log(params);

  var response = {
    statusCode: 201,
    body: "",
    headers: {
      "Access-Control-Allow-Headers" : "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
    },
  };

  const run = async function () {
    try {
      const results = await client.send(new PutItemCommand(params));
      console.log(results);
    } catch (err) {
      console.error(err);
      response = {
        statusCode: 500,
        body: "",
        headers: {
          "Access-Control-Allow-Headers" : "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
        },
      };
    }
  };

  await run();
  return response;
};
