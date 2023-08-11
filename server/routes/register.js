import { users } from "../dbModels";
import { Stripe } from "stripe";

const config = useRuntimeConfig();

export default defineEventHandler(async function (event) {
  const { name, email, password } = await readBody(event);
  const stripe = await Stripe(config.stripePriv);

  try {
    const check = await users.findOne({ email });
    if (check) {
      return { status: "Already registered" };
    } else {
      const customer = await stripe.customers.create({
        description: "",
        email,
        name,
      });

      const newUser = await users.create({
        name,
        email,
        password,
        plan: 0,
        stripeID: customer.id,
        substate: "None",
        billing: 0,
        startDate: Date.now(),
      });
      return {
        status: "OK",
      };
    }
  } catch (e) {
    console.log(e);
    return { status: "Failed to register" };
  }
});
