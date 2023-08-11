import { users } from "../dbModels";

const config = useRuntimeConfig();

export default defineEventHandler(async function (event) {
  console.log("hello");
  const { email, plan, billing } = await readBody(event);
  console.log(email, plan, billing);

  try {
    const check = await users.findOne({ email });
    console.log(check);
    if (check) {
      const user = await users.updateOne(
        { email },
        {
          $set: {
            plan,
            substate: "Active",
            billing,
            startDate: Date.now(),
          },
        }
      );
      console.log(user);
    }
  } catch (e) {
    console.log(e);
  }
});
