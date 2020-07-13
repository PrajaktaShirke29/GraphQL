const graphql = require('graphql');
const _ = require('lodash');
const UserModel = require('../model/user');
const HobbyModel = require('../model/hobby');
const PostModel = require('../model/post')
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql

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
                return PostModel.findById(parent.userId);
            }
        },
        hobbies: {
            type: new GraphQLList(hobbyType),
            resolve(parent, args){
                return HobbyModel.findById(parent.userId);
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
                return UserModel.findById( parent.userId);
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
                const user = UserModel.findById(parent.userId);
                console.log(user);
                return user;
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
                return UserModel.find({});
            }
        },
        hobbies: {
            type: new GraphQLList(hobbyType),
            resolve(parent, args){
                return HobbyModel.find({});
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args){
                return PostModel.find({});
            }
        },
        
        // get by id
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                // We resolve with data
                // return _.find(usersData, {id: args.id});

                return UserModel.findById(args.id);
                //get and return data form the data source
            }
        },

        hobby: {
            type: hobbyType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                return HobbyModel.findById(args.id);
            }
        },

        post: {
            type: PostType,
            args: {id: {type:GraphQLID}},

            resolve(parent, args) {
                return PostModel.findById(args.id);
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
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                profession: {type: new GraphQLNonNull(GraphQLString)}
            },

            resolve(parent, args){
                let data = new UserModel({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                });

                data.save();
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
                let data = new PostModel( {
                    comment: args.comment,
                    userId: args.userId
                })

                data.save();
                return data;
            }
        },

        createHobby: {
            type: hobbyType,
            args: {
                // id: {type: GraphQLID},
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                userId: {type: new GraphQLNonNull(GraphQLID)}
            },

            resolve(parent, args){
                let data =  new HobbyModel({
                    name: args.name,
                    description: args.description,
                    userId: args.userId
                })
                data.save();
                return data;
            }
        },

        // Update User

        updateUser: {
            type: UserType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                profession: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let obj = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                }

                return UserModel.findByIdAndUpdate(args.id, 
                    {
                        $set: obj
                    }, {new: true});
            }
        },

        updateHobby: {
            type: hobbyType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                userId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let obj = {
                    name: args.name,
                    description: args.description,
                    userId: args.userId
                };
                return HobbyModel.findByIdAndUpdate(args.id,
                    {
                        $set: obj
                    }, {new: true});
            }
        },

        updatePost: {
            type: PostType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                comment: {type: new GraphQLNonNull(GraphQLString)},
                userId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                const obj = {
                    comment: args.comment,
                    userId: args.userId
                }

                return PostModel.findByIdAndUpdate(args.id,
                    {
                        $set: obj
                    }, {new: true});
            }
        },

        // Remove user 

        deleteUser: {
            type: PostType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                const data= UserModel.findByIdAndDelete(args.id);
                if(data){
                    return data;
                    
                }
                return {
                    'message': 'Something went wrong',
                }
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
