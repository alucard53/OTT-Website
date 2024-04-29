<template>
  <div class="page">
    <div class="container">
      <form class="form" @submit="handleSubmit">
        <h2 class="heading">Sign in</h2>

        <span class="inputGroup">
          <label for="email" class="label"> Email </label>

          <input type="text" class="input" v-model="form.email" />
        </span>

        <span class="inputGroup">
          <label for="password" class="label">
            <h1>Password</h1>
          </label>

          <input type="password" class="input" v-model="form.password" />

          <label for="remember_me" style="color: #fff">
            <input type="checkbox" />
            Remember me
          </label>
        </span>

        <img v-if="loading" src="../public/loading.gif" width="50" height="50" />

        <div v-if="err.length > 0" style="color: red">
          {{ err }}
        </div>

        <button type="submit" class="Submit">Sign In</button>

        <p style="font-weight: 500; color: #fff">
          New here?
          <NuxtLink to="/" style="color: #8597ab">Sign Up</NuxtLink>
        </p>
      </form>
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
      err: "",
      form: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },

  methods: {
    async handleSubmit(event) {
      event.preventDefault();
      this.err = "";
      this.loading = true;

      try {
        const res = await fetch("http://localhost:6969/login", {
          method: "POST",
          body: JSON.stringify(this.form),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 404) {
          this.err = "User not found";
          this.loading = false;
        } else if (res.status === 400) {
          this.err = "Incorrect password";
          this.loading = false;
        } else {
          const data = await res.json();
          console.log(data);
          this.store.setUser(data);

          const data1 = await fetch("http://localhost:6969/checkSub", {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });

          this.loading = false;

          console.log(data1.status);

          switch (data1.status) {
            case 200:
              navigateTo("/dashb");
              break;
            case 206:
              navigateTo("/checkout");
              break;
            default:
              navigateTo("/plan");
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.page {
  background-color: #091636;
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.heading {
  font-size: xx-large;
  font-weight: 600;
  margin: 5% 0 8%;
  color: white;
  text-shadow: 2px 2px rgba(255, 255, 255, 0.34);
}

.form {
  width: 33rem;
  display: flex;
  flex-direction: column;
  background-color: #21376081;
  box-shadow: 4px 4px rgba(15, 15, 15, 0.268);
  padding: 2% 4% 1%;
  border-radius: 5%;
  justify-content: center;
  align-items: center;
}

.inputGroup {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.label {
  font-weight: 600;
  font-size: medium;
  color: white;
  /* text-shadow: 1px 1px rgba(255, 255, 255, 0.438); */
}

.input {
  width: 100%;
  padding: 1rem 1rem;
  margin: 8px 0px;
  display: inline-block;
  background-color: #4f708fa5;
  box-shadow: 4px 4px rgba(15, 15, 15, 0.268);
  color: #fff;
  outline: none;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: large;
}

.Submit {
  background-color: #091636;
  box-shadow: 4px 4px 4px #f5f5f516;
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  margin: 5%;
  font-size: larger;
  font-weight: 500;
  color: white;
}

.Submit:hover {
  box-shadow: 4px 4px 4px #f5f5f585;
  background-color: #213760;
  transition: all 0.3s ease 0s;
}
</style>
