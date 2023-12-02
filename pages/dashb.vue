<template>
  <NavbarComponent />

  <div class="page">
    <div class="flex flex-col p-5 m-3 bg-white rounded-mdi">
      <div class="flex flex-row">
        <div class="flex align-middle px-5 justify-start items-center">
          <span class="text-xl font-medium leading-tight">
            Current plan details
          </span>
        </div>

        <div class="flex justify-start">
          <span class="inline-block rounded bg-primary mx-1 my-4 px-2.5 py-2 text-xs font-bold text-white"
            :class="substate === 'Active' ? 'bg-blue-950' : 'bg-red-600'">
            {{ substate }}
          </span>

          <div class="flex w-3/6 ml-60 mr-5 justify-end items-center">
            <button v-if="substate === 'Active'"
              class="border-solid border-2 border-red-700 rounded-md text-red-700 px-2 py-2 ml-5 hover:bg-gray-200"
              @click="openCancel = true">
              Cancel
            </button>
          </div>

          <ClientOnly>
            <Teleport to=".page">
              <CancelConfirm v-if="openCancel" :jwt="token" @close_popup="openCancel = false" />
            </Teleport>
          </ClientOnly>
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

      <div class="flex flex-row font-bold text-2xl ml-5 mb-3.5">
        ₹ {{ price }}
      </div>

      <div class="ml-5 mb-1 text-sm">
        <span v-if="substate === `Active`">Your plan is active till
          <span class="text-blue-950">{{ endDate }}</span>
        </span>
        <span v-else class="text-gray-500">
          Renew your subscription to start watching again!
        </span>
      </div>

      <div class="flex flex-row my-2">
        <NuxtLink to="/plan">
          <button class="border-solid border-2 border-blue-900 rounded-md text-blue-900 px-2 py-2 ml-5 hover:bg-gray-200">
            {{ substate === "Active" ? "Change" : "Renew" }} Plan
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { userStore } from "~/stores/userStore";

import CancelConfirm from "~/components/CancelConfirm.vue";

export default {
  async mounted() {
    const store = userStore();

    this.substate = store.user.substate;
    this.plan = store.plans[store.sub.plan];
    this.billing = store.billing[store.sub.billing];
    this.price =
      store.prices[store.sub.billing][store.sub.plan].toString() +
      (this.billing === "Monthly" ? "/mo" : "/yr");
    this.devices = "";
    store.devices[store.sub.plan].forEach((element) => {
      this.devices += element + "+";
    });
    if (!store.user.endDate) {
      console.log("No date found")
    } else {
      this.endDate = store.user.endDate.substring(0, 10);
    }
    this.token = store.user.token;
  },
  data() {
    return {
      substate: "",
      plan: "",
      billing: "",
      devices: "",
      price: 0,
      endDate: "",
      openCancel: false,
      blurPage: "",
      token: {},
    };
  },
  methods: {},
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
  background-color: white;
  border-radius: 12px;
  margin: 0% 36%;
}

.blurPage {
  filter: blur(5px);
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
  color: #091636;
  padding: 2%;
  font-weight: 500;
  border-radius: 5px;
}
</style>
