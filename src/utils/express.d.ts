type userToken = {
  sub: string;
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
