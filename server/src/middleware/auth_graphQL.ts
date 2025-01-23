import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

if (!secretKey) {
  console.error('JWT_SECRET_KEY is not defined!');
}

export const authenticateToken = ({ req }: any) => {
  // Allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;
  //let token = req.headers.authorization?.split(' ')[1]; // Check Authorization header for Bearer token

  console.log('Auth Header:', req.headers.authorization);

  if (!token) {
    throw new GraphQLError('Authorization token is missing', { extensions: { code: 'UNAUTHENTICATED' } });
  }

  // If the token is sent in the authorization header, extract the token from the header
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

     // If no token is provided, return context with user as null
     if (!token) {
      console.log('No token provided');
      return req;
    }

  // Try to verify the token
  try {
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
    // If the token is valid, attach the user data to the request object

    // Log the decoded data
    // console.log('Decoded User Data:', data);

    req.user = data;
  } catch (err) {
    // If the token is invalid, log an error message
    console.log('Invalid token');
    throw new GraphQLError('Invalid or expired token', { extensions: { code: 'UNAUTHENTICATED' } });
  }

  // Return the request object
  return req;
};

export const signToken = (userName: string, userEmail: string, _id: unknown) => {
  // Create a payload with the user information
  const payload = { userName, userEmail, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY; // Get the secret key from environment variables
  console.log(process.env.JWT_SECRET_KEY);
  // Sign the token with the payload and secret key, and set it to expire in 2 hours
  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};
