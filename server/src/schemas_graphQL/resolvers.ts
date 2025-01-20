import User from '../models_mongo/user_mongo.js';
import { signToken } from '../middleware/auth_graphQL.js';
import { GraphQLError } from 'graphql';

const resolvers = {

    Query: {
        hello: () => "Hello, world!",
      },

  
    Mutation: {
      // create a user, sign a token, and send it back 
      addUser: async (_parent:any, { username, email, password } : { username: string; email: string; password: string }) => {
        console.log('Inputs:', { username, email, password });
        
        const user = await User.create({ username, email, password });
      
        if (!user) {
          throw new GraphQLError('Something is Wrong! Creating user failed');
        }
      
        const token = signToken(user.userName, user.userPassword, user._id);
        return { token, user };
      },
  
      // login a user, sign a token, and send it back 
      login: async (_parent: any, { username, email, password }: { username?: string; email?: string; password: string }) => {
        const user = await User.findOne({
          $or: [{ username }, { email }],
        });
  
        if (!user) {
          throw new GraphQLError("Can't find this user");
        }
  
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new GraphQLError('Wrong password');
        }
  
        const token = signToken(user.userName, user.userPassword, user._id);
        return { token, user };
      }
  
  
    },
  };
  
  export default resolvers;