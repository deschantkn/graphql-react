const express = require('express');
const graphqlHttp = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/gql-deschant');
mongoose.connection.once('open', () => {
  console.log('Database connected');
});

app.use('/graphql', graphqlHttp({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
