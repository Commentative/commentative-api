"use strict";
const AWS = require("aws-sdk");
const uuid = require("uuid");

module.exports.main = async event => {
  try {
    const { commentData, articleBody } = JSON.parse(event.body);

    if (false) {
      // Validate data
    }

    const timestamp = new Date().getTime();

    const params = {
      TableName: process.env.COMMENTATIVE_TABLE,
      Item: {
        uuid: uuid(),
        articleBody,
        comments: [
          { ...commentData, createdAt: timestamp, updatedAt: timestamp }
        ],
        createdAt: timestamp,
        updatedAt: timestamp
      }
    };
  } catch (err) {}
};
