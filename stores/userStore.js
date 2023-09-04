import { defineStore } from "pinia";

export const userStore = defineStore("userStore", {
  state: () => {
    let sub = {
      plan: 0,
      billing: 0,
    };

    let user = {
      email: "",
      plan: 0,
      substate: "None",
      billing: 0,
      stripeID: "",
      startData: "",
    };

    return {
      plans: ["Mobile", "Basic", "Standard", "Premium"],
      prices: [100, 200, 500, 700],
      devices: [
        ["Phone", "Tablet"],
        ["Phone", "Tablet", "Computer"],
        ["Phone", "Tablet", "Computer", "TV"],
        ["Phone", "Tablet", "Computer", "TV"],
      ],
      billing: ["Monthly", "Yearly"],
      sub: ref(sub),
      user: ref(user),
    };
  },
  actions: {
    setSub(newSub) {
      this.sub = newSub;
    },
    setUser(newUser) {
      this.user.email = newUser.email;
      this.user.plan = newUser.plan;
      this.user.substate = newUser.substate;
      this.user.stripeID = newUser.stripeID;
      this.user.billing = newUser.billing;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
