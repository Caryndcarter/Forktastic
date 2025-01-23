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
    addUser: async (
      _parent: any,
      {
        userName,
        userEmail,
        userPassword,
      }: { userName: string; userEmail: string; userPassword: string }
    ) => {
      console.log("Inputs:", { userName, userEmail, userPassword });

      const user = await User.create({ userName, userEmail, userPassword });

      if (!user) {
        throw new GraphQLError("Something is Wrong! Creating user failed");
      }

      const token = signToken(user.userName, user.userPassword, user._id);
      return { token, user };
    },

    // login a user, sign a token, and send it back
    login: async (_: any, args: any): Promise<any> => {
      const { email, password } = args;
      const user = await User.findOne({ userEmail: email });

      if (!user) {
        throw new GraphQLError("Wrong email or password.");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new GraphQLError("Wrong email or password.");
      }

      const token = signToken(user.userName, user.userPassword, user._id);
      return { token, user };
    },
  },
};

export default resolvers;
