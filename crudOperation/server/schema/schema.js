const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql

// Dummy data
var usersData= [
    {id: '1', name: 'Boand',age: 36, profession: 'Actor'},
    {id: '2', name: 'Paul',age: 34, profession: 'Dancing'},
    {id: '3', name: 'Calera',age: 30, profession: 'Crikter'},
    {id: '4', name: 'Reff',age: 42, profession: 'SE'},
    {id: '5', name: 'covers',age: 48, profession: 'SSE'},
];

var hobbyData = [
    {id: '101', name: 'Panting', description: 'Love to paint', userId: '1'},
    {id: '102', name: 'Dancing', description: 'Love to dance', userId: '1'},
    {id: '103', name: 'Reading', description: 'Love to read', userId: '3'},
    {id: '104', name: 'Programming', description: 'Love to program', userId: '4'},
    {id: '105', name: 'Cooking', description: 'Love to Cook', userId: '5'},
]

var postData = [
    {id: '201', comment: 'Id is 201', userId: '1'},
    {id: '202', comment: 'Id is 202', userId: '1'},
    {id: '203', comment: 'Id is 203', userId: '3'},
    {id: '204', comment: 'Id is 204', userId: '4'},
    {id: '205', comment: 'Id is 205', userId: '5'}
]
// Create types
const UserType = new GraphQLObjectType({
    name:'User',
    description: 'Documentation of user',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age:{type: GraphQLInt},
        profession: {type: GraphQLString},
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postData, {userId: parent.id});
            }
        },
        hobbies: {
            type: new GraphQLList(hobbyType),
            resolve(parent, args){
                return _.filter(hobbyData, {userId: parent.id});
            }
        }
    })
});

const hobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Documentation of hobby',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        users: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, {id: parent.userId});
            }
        }
    })
});

const PostType = new GraphQLObjectType( {
    name: 'Post',
    description: 'Documentation to post',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, {id: parent.userId});
            }
        }
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        // fetch all the data
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return usersData;
            }
        },
        hobbies: {
            type: new GraphQLList(hobbyType),
            resolve(parent, args){
                return hobbyData;
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(paren, args){
                return postData;
            }
        },
        
        // get by id
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                // We resolve with data
                return _.find(usersData, {id: args.id});
                //get and return data form the data source
            }
        },

        hobby: {
            type: hobbyType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                return _.find(hobbyData, {id: args.id});
            }
        },

        post: {
            type: PostType,
            args: {id: {type:GraphQLID}},

            resolve(parent, args) {
                return _.find(postData, {id: args.id});
            }
        }
    }
});

//Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        createUser: {
            type: UserType,
            args: {
                // id: {type: GraphQLID},
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                profession: {type: GraphQLString}
            },

            resolve(parent, args){
                let data = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                }

                return data;
            }
        },

        createPost: {
            type: PostType,
            args: {
                // id: {type: GraphQLID},
                comment: {type: GraphQLString},
                userId: {type: GraphQLID}
            },

            resolve(parent, args){
                let data = {
                    comment: args.comment,
                    userId: args.userId
                }
                return data;
            }
        },

        createHobby: {
            type: hobbyType,
            args: {
                // id: {type: GraphQLID},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                userId: {type: GraphQLID}
            },

            resolve(parent, args){
                let data = {
                    name: args.name,
                    description: args.description,
                    userId: args.userId
                }

                return data;
            }
        }
    }
})
module.exports = new GraphQLSchema(
    {
        query: RootQuery,
        mutation: Mutation
    },
)
