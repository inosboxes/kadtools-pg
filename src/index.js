// Import dependencies
const crypto = require("crypto");
const bunyan = require("bunyan");
const levelup = require("levelup");
const leveldown = require("leveldown");
const Storage = require("fs-storage");
const kad = require("kad");
const SP = "-";
const FSP = "/";
const RESOURCES = "./resources";
const DB_PATH = [RESOURCES, "db-storage"].join(FSP);
const FS_PATH = [RESOURCES, "fs-storage"].join(FSP);
const TEST_NETS = "test-net-ids.json";

let randomIdentity = kad.utils.getRandomKeyBuffer;
let stringify = JSON.stringify;
let debug = require("debug")("index-dbg");
let store = new Storage(FS_PATH);

function getRandomPort() {
  return Math.floor(Math.random() * 1000) + 1337;
}
function toHex(identity) {
  return identity.toString("hex");
}
function createNode(nodeMeta) {
  if (nodeMeta instanceof Array) {
    const hostname = nodeMeta[1];
    const port = nodeMeta[2];
    const identity = Buffer.from( nodeMeta[0]);
    const dbAlias = ["Node", toHex(identity)].join(SP);
    const path2db = DB_PATH + FSP + dbAlias;
    //TODO handle db initialization error
    // (node:10270) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): OpenError: IO error: lock ./resources/db-storage/Node-e56bca9c1652f03dadb5bea36c10601a19f955b1/LOCK: Resource temporarily unavailable
    //
    const storage = levelup(leveldown(path2db));
    const logger = bunyan.createLogger({ name: dbAlias });
    const transport = new kad.HTTPTransport();
    const contact = { hostname , port};
    const node = kad({ transport, storage, logger, identity, contact });
    //TODO handle port is in use errro
    // {"name":"Node-e56bca9c1652f03dadb5bea36c10601a19f955b1","hostname":"osboxes","pid":10270,"level":40,"msg":"listen eaddrinuse :::1337","time":"2018-01-04T22:41:56.510Z","v":0}
    node.listen(port);
    return node;
  } else {
    throw new Error("Invalid input Identity for Node.");
  }
}
function generateTestIds(nodesCount = 5) {
  let netIds = { seeds: [], nodes: [] };
  netIds.seeds.push([randomIdentity(), "localhost", 1337]);
  for (var i = 0, len = nodesCount; i < len; i++) {
    netIds.nodes.push([randomIdentity(), "localhost", getRandomPort()]);
  }
  return netIds;
}

function getTestNetworkIds() {

  let networkIds = store.getItem(TEST_NETS);
  if (!networkIds) {
    networkIds = generateTestIds();
    store.setItem(TEST_NETS, stringify( networkIds ));
    return networkIds;
  } else {
    return JSON.parse(networkIds);
  }
}

module.exports = function index() {
  return {
    getTestNetworkIds,
    generateTestIds,
    randomIdentity,
    toHex,
    getRandomPort,
    createNode
  };
};
