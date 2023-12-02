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
      endDate: "",
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
          endDate: "",
        }
        return
      }

      if (this.user.name === '') {
        this.user.name = newUser.name;
      }

      if (newUser.email) {
        this.user.email = newUser.email;
      }

      if (newUser.token) {
        this.user.token = newUser.token;
      }


      if (newUser.substate && newUser.substate !== "") {
        this.user.substate = newUser.substate;
      }

      if (newUser.endDate) {
        this.user.endDate = newUser.endDate;
      }

    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
