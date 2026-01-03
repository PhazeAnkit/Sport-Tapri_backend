type userToken = {
  sub: Types.ObjectId;
  email: string;
  iat: number;
  exp: number;
};

declare global {
  namespace Express {
    interface Request {
      user?: userToken;
    }
  }
}

export {};
