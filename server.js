const express =  require('express')
const bodyParser =  require('body-parser')
const { graphqlExpress, graphiqlExpress, } = require('graphql-server-express')
const { makeExecutableSchema, } = require('graphql-tools')

const schema = require('./data/schema')
const resolvers = require('./data/resolvers')

const PORT = 3000;

var app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({
 schema: makeExecutableSchema({
 	typeDefs: schema,
  	resolvers: resolvers,
  	allowUndefinedInResolve: false,
  	printErrors: true,
 }),
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT);