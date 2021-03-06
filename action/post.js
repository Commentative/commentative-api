"use strict";
const AWS = require("aws-sdk");
const uuid = require("uuid");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.main = async event => {
  try {
    const { commentData, articleBody, user } = JSON.parse(event.body);

    if (false) {
      // Validate data
    }

    const timestamp = new Date().getTime();

    const params = {
      TableName: process.env.COMMENTATIVE_TABLE,
      Item: {
        uuid: uuid(),
        articleBody,
        comments: commentData.map(({ body, reference }) => ({
          body,
          reference,
          createdAt: timestamp,
          updatedAt: timestamp,
          uuid: uuid(),
          user
        })),
        createdAt: timestamp,
        updatedAt: timestamp
      }
    };

    const result = await dynamoDb.put(params).promise();

    if (false) {
      // Check for error
    }

    console.log(result);

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    };
  } catch (err) {
    console.error(err);
  }
};
