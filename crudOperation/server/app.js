const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const schemaType = require('./schema/schema-type');

const app = express();

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