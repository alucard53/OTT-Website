<template>
  <NavbarComponent />
  <div class="page">
    <div class="flex flex-col bg-white rounded-md">
      <div class="flex flex-row">
        <div class="flex align-middle px-5 justify-start items-center">
          <span class="mb-2 text-xl font-medium leading-tight">
            Current plan details
          </span>
        </div>
        <div class="flex justify-start">
          <button
            type="button"
            class="inline-block rounded bg-primary mx-3 my-4 px-2 pb-1.5 pt-1.5 text-xs font-medium bg-blue-400"
          >
            {{ substate }}
          </button>
          <div class="flex w-3/6 ml-60 mr-5 justify-end items-center">
            <span>Cancel</span>
          </div>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="flex flex-col ml-5 mb-1">
          <span class="font-semibold">{{ plan }}</span>
          <span class="text-gray-500">{{
            devices.substring(0, devices.length - 1)
          }}</span>
        </div>
      </div>
      <div class="flex flex-row font-bold text-2xl ml-5 mb-4">
        ₹ {{ price }}
      </div>
      <div class="flex flex-row ml-5 mb-2">
        <button
          class="border-solid border-2 border-blue-900 rounded-md text-blue-900 px-2 py-2"
        >
          Cancel Plan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { userStore } from "~/stores/userStore";

export default {
  async mounted() {
    this.store = userStore();
    this.substate = this.store.user.substate;
    this.plan = this.store.plans[this.store.user.plan];
    this.billing = this.store.billing[this.store.user.billing];
    this.price =
      this.store.prices[this.store.user.plan].toString() +
      (this.billing === "Monthly" ? "/mo" : "/yr");
    this.devices = "";
    this.store.devices[this.store.user.plan].forEach((element) => {
      this.devices += element + "+";
    });
  },
  data() {
    return {
      substate: "",
      plan: "",
      billing: "",
      devices: "",
      price: 0,
    };
  },
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1f4c90;
}

.container {
  background-color: white;
  border-radius: 12px;
  margin: 0% 36%;
}

.hcontainer {
  display: flex;
  justify-content: center;
}

.row {
  display: flex;
  align-items: center;
  justify-content: stretch;
  justify-items: stretch;
}

.heading {
  padding-left: 4%;
  font-size: larger;
  font-weight: 500;
  width: max-content;
}

.statecontainer {
  background-color: #8db5f1;
  color: #1f4c90;
  padding: 2%;
  font-weight: 500;
  border-radius: 5px;
}
</style>