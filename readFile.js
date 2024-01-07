const http = require("http");
const route = require("./route");
const express = require('express');

console.log(route.someText);
const server = http.createServer(route.handler);

server.listen(3000);
