"use strict";
const AWS = require("aws-sdk");
const uuid = require("uuid");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.main = async event => {
  try {
    const uuid = event.pathParameters.uuid;
    const { commentData } = JSON.parse(event.body);

    if (false) {
      // validate data
    }

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
      UpdateExpression: "SET #comments = list_append(#comments, :comments)",
      ReturnValues: "ALL_NEW"
    };

    const result = await dynamoDb.put(params).promise();
=
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    console.error(err);
  }
};
