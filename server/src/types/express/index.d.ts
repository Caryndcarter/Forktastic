declare namespace Express {
  interface Request {
    user: {
      id: number;
      userName: string;
      userEmail: string;
    };
  }
}
