#!/usr/bin/env node

const path = require("path");
const workspaceName = process.argv[2];
const workspacePath = path.dirname(
  require.resolve(`${workspaceName}/package.json`)
);

console.log(workspacePath);
