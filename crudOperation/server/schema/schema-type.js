const graphql = require('graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLList
} = graphql


const PersonType = new GraphQLObjectType({
    name: 'personData',
    description: 'Scalar Type data',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: GraphQLInt},
        isMarried: {type: GraphQLBoolean},
        gpa: {type: GraphQLFloat},
        JustAtType: {
            type: new GraphQLList(PersonType),
            resolve(parent, args){
                return parent;
            }
        }
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Details of Person',
    fields: {
        persons: {
            type: PersonType,
            resolve(parent, args){
                let data = {
                    name: '',
                    age: '12',
                    isMarried: false,
                    gpa: 3.14
                }
    
                return data;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
