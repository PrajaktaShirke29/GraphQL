const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const schemaType = require('./schema/schema-type');
const mongoose = require('mongoose');
const cors = require('cors');
const uri = "mongodb+srv://India:India@1234@cluster0.2ya8u.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  })
.then(() => {
    console.log('Server Connected to database');
});
// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
  // perform actions on the collection object
//   client.close();
// });

const app = express();
app.use(cors());
app.use('/graphqlType', graphqlHTTP({
    graphiql: true,
    schema: schemaType,
}));

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
}));

app.listen(4000, () => {
    console.log('Server connected at port 4000');
})