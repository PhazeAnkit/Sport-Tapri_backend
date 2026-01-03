import crypto from "crypto";

function signHS256(data: string) {
  const SECRET = process.env.JWT_SECRET;

  if (!SECRET) throw new Error("Error SECRET Not found");

  return crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
}

export function generateAccessToken(id: string, email: string): string {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString(
    "base64url"
  );

  const iat = Math.floor(Date.now() / 1000);
  const claim = {
    sub: id,
    email,
    iat,
    exp: iat + 9000,
  };
  const encodedClaim = Buffer.from(JSON.stringify(claim)).toString("base64url");
  const payload = `${encodedHeader}.${encodedClaim}`;
  const signature = signHS256(payload);

  return `${payload}.${signature}`;
}

export function verifyAccessToken(token: string) {
  const [header, payload, signature] = token.split(".");

  if (signHS256(header + "." + payload) != signature)
    throw new Error("Access Token Invaild");

  const claim = JSON.parse(Buffer.from(payload, "base64url").toString());
  if (claim["exp"] < Math.floor(Date.now() / 1000))
    throw new Error("Access Token Expired");

  return claim;
}
