const { Module } = require("module");
const path = require("path");

module.exports = path.dirname(Module.name);
