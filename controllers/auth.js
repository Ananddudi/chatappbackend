import jwt from "jsonwebtoken";

export async function authorization(req, res, next) {
  if (!req.headers.authorization) {
    return res.send("authorization header is required");
  }
  const [auths, token] = req.headers.authorization.split(" ");
  if (auths !== "Bearer") {
    return res.status(405).json("Bearer authorization is only permissible");
  }
  jwt.verify(token, process.env.SCRETEKEY, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json("You are not suppose to authorize this root!");
    }
    req.auth = data.email;
    next();
  });
}
