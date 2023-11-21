<template>
  <!-- <NavbarComponent /> -->
  <div class="page">
    <form class="container" v-if="!loading">
      <div class="left">
        <span class="headingl">Complete Payment</span>
        <span class="instruc"
          >Enter your credit or debit card details below</span
        >
        <div>
          <label>
            <div id="card-element" class="field card"></div>
          </label>
        </div>
        <div class="button-container">
          <button @click="startPayment">Confirm Payment</button>
        </div>
      </div>

      <div class="right">
        <span class="headingr">Order Summary</span>
        <div class="row">
          <span class="rowlabel">Plane Name</span>
          <span class="rowval">{{ plan }}</span>
        </div>
        <div class="row">
          <span class="rowlabel">Billing Cycle</span>
          <span class="rowval">{{ billing }}</span>
        </div>
        <div class="row">
          <span class="rowlabel">Plan price</span>
          <span class="rowval">₹ {{ price }}</span>
        </div>
      </div>
    </form>
    <img v-else src="../public/loading.gif" width="400" height="400" />
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import { userStore } from "~/stores/userStore";

let card;
let stripe;
let elements;
let clientSecret;

export default {
  data() {
    return {
      store: {},
      plan: "",
      loading: true,
      billing: "",
      price: 0,
    };
  },

  async created() {
    this.store = userStore();
    this.plan = this.store.plans[this.store.sub.plan];
    this.billing = this.store.billing[this.store.sub.billing];
    this.price =
      this.store.prices[this.store.sub.billing][
        this.store.sub.plan
      ].toString() + (this.billing === "Monthly" ? "/mo" : "/yr");
    if (this.store.user.stripeID !== "") {
      try {
        const res = await fetch("http://localhost:6969/pay", {
          method: "POST",
          body: JSON.stringify({
            plan: this.store.sub.plan,
            billing: this.store.sub.billing,
            email: this.store.user.email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.loading = false;
        if (res.status === 500) {
          console.log("Error in creating subscription");
        } else if (res.status === 206) {
          const data = await res.json();
          clientSecret = data.secret;
        } else {
          const d = new Date();
          this.store.setUser({
            plan: this.store.sub.plan,
            substate: "Active",
            billing: this.store.sub.billing,
            startDate: `${d.getDate()}:${d.getMonth()}:${d.getFullYear()}`,
          });
          navigateTo("/dashb");
        }
      } catch (e) {
        this.loading = false;
        console.log(e);
      }

      try {
        stripe = await loadStripe(
          "pk_test_51NdU4USA6MDXluwIhzPIPNObKmZBacf8YpRajuzGnmzrV86wsj4Rt2LefbVKqQrb8W3dwmGoAj4TYcz0I6xxLmkW00YHEtJlFA"
        );
      } catch (e) {
        console.log("Failed to fetch stripe");
        console.log(e);
        return;
      }

      elements = stripe.elements({
        appearance: {},
        clientSecret,
      });

      card = elements.create("card", {
        hidePostalCode: true,
        style: {
          base: {
            iconColor: "#777",
            color: "#32315E",
            lineHeight: "48px",
            fontWeight: 500,
            fontFamily:
              '"Open Sans", "Helvetica Neue", "Helvetica", sans-serif',
            fontSize: "17px",

            "::placeholder": {
              color: "darkgray",
            },
          },
        },
      });
      card.mount("#card-element");
    }
  },
  methods: {
    async startPayment(event) {
      event.preventDefault();
      if (!stripe || !elements) {
        console.log("stripe/elems not init");
        return;
      }

      const res = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {},
        },
      });

      if (res.paymentIntent.status === "succeeded") {
        const res = await fetch("http://localhost:6969/store", {
          method: "POST",
          body: JSON.stringify({
            email: this.store.user.email,
            plan: this.store.sub.plan,
            billing: this.store.sub.billing,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const d = new Date();
        this.store.setUser({
          plan: this.store.sub.plan,
          substate: "Active",
          billing: this.store.sub.billing,
          startDate: `${d.getDate()}:${d.getMonth()}:${d.getFullYear()}`,
        });
        navigateTo("/dashb");
      }
    },
  },
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #e2e2e2;
}

.container {
  display: flex;
  margin: 0 17%;
}

.left {
  width: 60%;
  background-color: white;
  border-radius: 8px 0 0 8px;
  display: flex;
  flex-direction: column;
  padding: 1%;
}

.headingl {
  font-size: xx-large;
  font-weight: 600;
  margin: 4% 4% 0;
}

.headingr {
  font-size: x-large;
  font-weight: 600;
  margin: 8% 4% 5%;
}

.instruc {
  margin: 1% 4% 0;
  color: #929292;
  font-weight: 500;
}

.card {
  border: 2px solid #ccc;
  margin: 4%;
  border-radius: 7px;
  padding-left: 2%;
}

.button-container {
  margin: 0 4% 3%;
}

button {
  background-color: #091636;
  color: white;
  padding: 2% 3%;
  border-radius: 4px;
}

button:hover {
  background-color: #133669;
  transition: all 0.3s ease 0s;
}

.right {
  width: 40%;
  border-radius: 0 8px 8px 0;
  display: flex;
  background-color: #f0f0f0;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 1% 3%;
}

.row {
  margin-left: 4%;
  padding: 2.4% 0;
  border-bottom: 1px solid #ccc;
  display: flex;
}

.rowlabel {
  width: 50%;
  font-weight: 500;
}

.rowval {
  width: 50%;
  display: flex;
  font-weight: 500;
  justify-content: flex-end;
}
</style>
