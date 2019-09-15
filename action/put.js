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

    const commenDataWithUuid = commentData.map(comment => ({
      ...commentData,
      uuid: uuid()
    }));

    const params = {
      TableName: process.env.COMMENTATIVE_TABLE,
      Key: {
        uuid
      },
      ExpressionAttributeNames: {
        "#comments": "comments"
      },
      ExpressionAttributeValues: {
        ":commentData": commenDataWithUuid
      },
      UpdateExpression: "SET #comments = list_append(#comments, :commentData)",
      ReturnValues: "ALL_NEW"
    };

    const result = await dynamoDb.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 200,
      body: JSON.stringify(err)
    };
  }
};
