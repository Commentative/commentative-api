"use strict";
const AWS = require("aws-sdk");
const uuid = require("uuid");

module.exports.main = async event => {
  try {
    const { comments, articleBody } = JSON.parse(event.body);

    if (false) {
      // Validate data
    }
  } catch (err) {}
};
