interface user {
  _id: unknown;
  userName: string;
  userEmail: string;
}

interface user_context {
  user: user;
}

export { user, user_context };
