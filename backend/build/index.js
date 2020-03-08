"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const apollo_server_1 = require("apollo-server");
// Load schema from an external file (relative to build directory).
const schema = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'schema.graphql'));
const typeDefs = apollo_server_1.gql `${schema}`;
// Define resolvers to load
const resolvers = {
    Query: {
        hello: () => 'Hello, world!'
    },
};
async function start() {
    // Start the server
    const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
    const { url } = await server.listen();
    console.log(`🚀 Server ready at ${url}`);
}
start();
