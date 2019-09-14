"use strict";
const AWS = require("aws-sdk");
const uuid = require("uuid");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.main = async event => {
  try {
    const uuid = event.pathParameters.uuid;
    const { commentData } = JSON.parse(event.body);

    const params = {
      TableName: process.env.COMMENTATIVE_TABLE,
      Key: {
        email
      },
      ExpressionAttributeNames: {
        "#comments": "comments"
      },
      ExpressionAttributeValues: {
        ":comments": commentData
      },
      UpdateExpression:
        "SET #emailConfirmed = :emailConfirmed, updatedAt = :updatedAt",
      ReturnValues: "ALL_NEW"
    };

    const result = await dynamoDb.get(params).promise();
    const commentativeData = result.Item;

    return {
      statusCode: 200,
      body: JSON.stringify(commentativeData)
    };
  } catch (err) {
    console.error(err);
  }
};
