<template>
  <div class="page">
    <div class="container">
      <span class="font-bold md:text-3xl mt-5">Choose the right plan for you</span>
      <div class="grid grid-rows-1 grid-flow-row">
        <div class="grid grid-cols-5 mb-8 mt-10">
          <div class="plantype">
            <div class="button">
              <div class="plantypeOpt" :class="monthly" @click="() => {
                yearly = '';
                monthly = 'sel';
              }
                ">
                Monthly
              </div>
              <div class="plantypeOpt" :class="yearly" @click="() => {
                monthly = '';
                yearly = 'sel';
              }
                ">
                Yearly
              </div>
            </div>
          </div>
          <div v-for="(plan, index) in plans" :key="index" class="planbox" @click="changePlan(index)"
            :class="selPlan[index]">
            {{ plan }}
            <div :class="triangle[index]"></div>
          </div>
        </div>

        <div class="grid grid-cols-5 row py-3">
          <span class="rowlabel">
            <span class="labeltext">Monthly Price</span>
          </span>

          <span v-for="(price, index) in prices[yearly === '' ? 0 : 1]" :key="index" class="rowvals"
            :class="selPlan[index]">
            <span class="rowval">{{ price }}</span>
          </span>
        </div>

        <div class="grid grid-cols-5 row py-3">
          <span class="rowlabel">
            <span class="labeltext">Video Quality</span>
          </span>

          <div v-for="(qual, index) in vqual" :key="index" class="rowvals" :class="selPlan[index]">
            <span class="rowval">{{ qual }}</span>
          </div>
        </div>

        <div class="grid grid-cols-5 row py-3">
          <span class="rowlabel">
            <span class="labeltext">Resolution</span>
          </span>

          <div v-for="(r, index) in res" :key="index" class="rowvals" :class="selPlan[index]">
            <span class="rowval">{{ r }}</span>
          </div>
        </div>

        <div class="grid grid-cols-5 rown">
          <span class="rowlabel">
            <span class="labeltext">Devices you can use to watch</span>
          </span>

          <div v-for="(devs, index) in devices" :key="index" class="flex flex-col" :class="selPlan[index]">
            <span v-for="(device, j) in devs" :key="j" class="devices">
              {{ device }}
            </span>
          </div>
        </div>
      </div>
      <button class="submit" @click="initPayment">Next</button>
    </div>
  </div>
</template>

<script>
import { userStore } from "~/stores/userStore";

export default {
  created() {
    this.store = userStore();
  },
  data() {
    return {
      monthly: "sel",
      yearly: "",
      selPlan: ["selplan", "notsel", "notsel", "notsel"],
      triangle: ["triangle", "", "", ""],
      plans: [],
      prices: [],
      vqual: ["Good", "Good", "Better", "Best"],
      res: ["480p", "480p", "1080p", "4K+HDR"],
      devices: [],
      choice: 0,
    };
  },
  mounted() {
    this.plans = this.store.plans;
    this.prices = this.store.prices;
    this.devices = this.store.devices;
  },
  methods: {
    initPayment() {
      this.store.setSub({
        plan: this.choice,
        billing: this.yearly === "" ? 0 : 1,
      });
      navigateTo("/checkout");
    },

    changePlan(index) {
      for (let i = 0; i < 4; i++) {
        this.choice = index;
        if (i == index) {
          this.selPlan[i] = "selplan";
          this.triangle[i] = "triangle";
        } else {
          this.selPlan[i] = "notsel";
          this.triangle[i] = "";
        }
      }
    },
  },
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  background-color: #e2e2e2;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0% 10%;
}

.plantype {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.button {
  background-color: #091636;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3% 1%;
  margin-right: 4rem;
  border-radius: 4rem;
  font-size: large;
}

.plantypeOpt {
  color: white;
  padding: 0.5rem;
  margin: 0.1rem 0.5rem;
  cursor: pointer;
}

.sel {
  background-color: white;
  color: #091636;
  border-radius: 8rem;
  font-weight: bolder;
}

.selplan {
  color: #091636;
}

.notsel {
  opacity: 0.6;
}

.planbox {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #091636;
  border-radius: 4px;
  color: white;
  font-weight: 600;
  font-size: large;
  padding: 18% 0;
  margin-left: 29%;
  position: relative;
  cursor: pointer;
}

.triangle {
  position: absolute;
  bottom: -9px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #091636;
}

.row {
  border-bottom: 1px solid #ccc;
}

.rown {
  padding: 1.25% 0%;
}

.rowlabel {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 12pt;
  font-weight: 600;
}

.rowvals {
  display: flex;
  align-items: center;
  justify-content: center;
}

.rowval {
  margin-left: 29%;
  font-weight: 650;
  font-size: 10pt;
}

.devices {
  margin-left: 28%;
  font-weight: 650;
  font-size: 10pt;
  display: flex;
  justify-content: center;
  padding: 4% 0;
}

.submit {
  background-color: #091636;
  padding: 1.5% 14%;
  color: white;
  font-size: larger;
  border-radius: 5px;
  margin-top: 2%;
}

.submit:hover {
  background-color: #213760;
  transition: all 0.3s ease 0s;
}
</style>