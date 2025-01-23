import User from "../models_mongo/user.js";
import { signToken, AuthenticationError } from "../middleware/auth_graphQL.js";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    getUser: async (_: any, _args: any, context: any): Promise<any> => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("could not authenticate user.");
    },
  },

  Mutation: {
    // create a user, sign a token, and send it back
    signUp: async (
      _parent: any,
      {
        userName,
        userEmail,
        userPassword,
      }: { userName: string; userEmail: string; userPassword: string }
    ) => {
      const user = await User.create({ userName, userEmail, userPassword });

      if (!user) {
        throw new GraphQLError("Something is Wrong! Creating user failed");
      }

      const token = signToken(user.userName, user.userPassword, user._id);
      console.log(`User ${user.userName} sucessfully signed up`);
      return { token, user };
    },

    // login a user, sign a token, and send it back
    login: async (_: any, args: any): Promise<any> => {
      const { userEmail, userPassword } = args;
      console.log(userEmail);
      const user = await User.findOne({ userEmail: userEmail });

      if (!user) {
        throw new GraphQLError("Wrong email");
      }

      const correctPw = await user.isCorrectPassword(userPassword);
      if (!correctPw) {
        throw new GraphQLError("Wrong password");
      }

      const token = signToken(user.userName, user.userPassword, user._id);
      return { token, user };
    },
  },
};

export default resolvers;
