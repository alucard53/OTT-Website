<template>
  <div class="page">
    <div class="container">
      <form class="form" @submit="handleSubmit">
        <h2 class="heading">Log in to your account</h2>

        <span class="inputGroup">
          <label for="email" class="label"> Email </label>

          <input type="text" class="input" v-model="form.email" />
        </span>

        <span class="inputGroup">
          <label for="password" class="label">
            <h1>Password</h1>
          </label>

          <input type="password" class="input" v-model="form.password" />

          <label for="remember_me">
            <input type="checkbox" />
            Remember me
          </label>
        </span>

        <img v-if="loading" src="../public/loading.gif" width="50" height="50" />

        <div v-if="err.length > 0" style="color: red">
          {{ err }}
        </div>

        <input type="submit" value="Log in" class="Submit" />

        <p style="font-weight: 500">
          New to My-App?
          <NuxtLink to="/" style="color: #1f4c90">Sign In</NuxtLink>
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

      const res = await fetch("http://localhost:6969/login", {
        method: "Post",
        body: JSON.stringify(this.form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      this.loading = false;

      if (res.status === 404) {
        this.err = "User not found";
      } else if (res.status === 400) {
        this.err = "Incorrect password";
      } else {
        const data = await res.json();
        console.log("Data", data);
        this.store.setUser(data);

        const data1 = await fetch("http://localhost:6969/checkSub", {
          headers: {
            Authorization: `Bearer ${this.store.user.token}`,
          },
        });

        console.log("Data1", data1)

        if (data1.status === 200) {
          navigateTo("/dashb");
        } else {
          navigateTo("/plan");
        }

      }
    },
  },
};
</script>

<style scoped>
.page {
  background-color: #1f4c90;
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
  font-size: x-large;
  font-weight: 600;
  margin: 5% 0 8%;
}

.form {
  width: 33rem;
  display: flex;
  flex-direction: column;
  background-color: white;
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
  font-weight: 500;
  font-size: medium;
}

.input {
  width: 100%;
  padding: 1rem 1rem;
  margin: 8px 0px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: medium;
}

.Submit {
  background-color: #1f4c90;
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  margin: 5%;
  font-size: larger;
  color: white;
}
</style>
