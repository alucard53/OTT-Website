import { defineStore } from "pinia";

export const userStore = defineStore("userStore", {
  state: () => {
    let sub = {
      plan: 0,
      billing: 0,
    };

    let user = {
      name: "",
      email: "",
      plan: 0,
      token: "",
      substate: "None",
      billing: 0,
      startDate: "",
    };

    return {
      plans: ["Mobile", "Basic", "Standard", "Premium"],
      prices: [
        [100, 200, 500, 700],
        [1000, 2000, 5000, 7000],
      ],
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

      if (!newUser) {
        this.user = {
          name: "",
          email: "",
          plan: 0,
          token: "",
          substate: "None",
          billing: 0,
          startDate: "",
        }
        return
      }

      if (this.user.name === '') {
        this.user.name = newUser.name;
      }
      this.user.email = newUser.email;
      this.user.token = newUser.token;
      this.user.plan = newUser.plan;
      this.user.substate = newUser.substate;
      this.user.startDate = newUser.startDate;
      this.user.billing = newUser.billing;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
