import { Stripe } from "stripe";

const config = useRuntimeConfig();

const price_links = [
  [
    //mobile
    "price_1NdU8qSA6MDXluwIwVIWjxM0", //monthly
    "price_1NdWZBSA6MDXluwIv8SwwlJp", //yearly
  ],
  [
    //basic
    "price_1NdUAMSA6MDXluwIUGNT6Ycy", //monthly
    "price_1NdWYgSA6MDXluwIfqduqnum", //yearly
  ],
  [
    //standard
    "price_1NdUB5SA6MDXluwIonElPyLD", //monthly
    "price_1NdWWjSA6MDXluwIobzubQa0", //yearly
  ],
  [
    //premium
    "price_1NdUBrSA6MDXluwIT00vFJzX", //monthly
    "price_1NdWWISA6MDXluwIhiBvxcm4", //yearly
  ],
];

const prices = [100, 200, 500, 700];

export default defineEventHandler(async function (event) {
  const { plan, billing, customer } = await readBody(event);

  const stripe = await Stripe(config.stripePriv);

  const subscription = await stripe.subscriptions.create({
    customer,
    items: [{ price: price_links[plan][billing] }],
    collection_method: "send_invoice",
    days_until_due: 1,
  });

  const invoice = await stripe.invoices.finalizeInvoice(
    subscription.latest_invoice
  );

  console.log(invoice.payment_intent);

  const paymentIntent = await stripe.paymentIntents.retrieve(
    invoice.payment_intent
  );

  return { secret: paymentIntent.client_secret };
});
