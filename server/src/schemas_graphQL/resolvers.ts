import User from '../models_mongo/user_mongo.js';
import { signToken } from '../middleware/auth_graphQL.js';
import { GraphQLError } from 'graphql';

const resolvers = {

    Query: {
        hello: () => "Hello, world!",
      },

  
    Mutation: {
      // create a user, sign a token, and send it back 
      addUser: async (_parent:any, { userName, userEmail, userPassword } : { userName: string; userEmail: string; userPassword: string }) => {
        console.log('Inputs:', { userName, userEmail, userPassword });
        
        const user = await User.create({ userName, userEmail, userPassword });
      
        if (!user) {
          throw new GraphQLError('Something is Wrong! Creating user failed');
        }
      
        const token = signToken(user.userName, user.userPassword, user._id);
        return { token, user };
      },
  
      // login a user, sign a token, and send it back 
      login: async (_parent: any, { userName, userEmail, userPassword }: { userName?: string; userEmail?: string; userPassword: string }) => {
        const user = await User.findOne({
          $or: [{ userName }, { userEmail }],
        });
  
        if (!user) {
          throw new GraphQLError("Can't find this user");
        }
  
        const correctPw = await user.isCorrectPassword(userPassword);
        if (!correctPw) {
          throw new GraphQLError('Wrong Password');
        }
  
        const token = signToken(user.userName, user.userPassword, user._id);
        return { token, user };
      }
  
  
    },
  };
  
  export default resolvers;