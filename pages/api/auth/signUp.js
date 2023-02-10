import connectMongo from "../../../database/connection";
import Users from "../../../model/signUp/User";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed..." }));

  // only post method is accepted
  try {
    if (req.method === "POST") {
      if (!req.body)
        return res.status(404).json({ error: "Don't have form data..." });

      const { username, email, password } = req.body;

      // check duplicates
      const existingUser = await Users.findOne({ email });

      if (existingUser)
        return res.status(422).json({ message: "User Already Exists..." });

      // hash password
      Users.create(
        { username, email, password: await hash(password, 12) },
        function (err, data) {
          if (err) return res.status(404).json({ err });
          res.status(201).json({ status: true, user: data });
        }
      );
    } else {
      res
        .status(500)
        .json({ error: "HTTP method not valid only POST Accepted" });
    }
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
}
