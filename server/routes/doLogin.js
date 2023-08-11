import { users } from "../dbModels";

export default defineEventHandler(async function (event) {
  const { email, password } = await readBody(event);

  try {
    const user = await users.findOne({ email });
    if (user) {
      if (password === user.password) return { user };

      return { error: "Incorrect Password" };
    }
    return { error: "User Not Found" };
  } catch (e) {
    console.log(e);
  }
});
