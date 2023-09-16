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
        console.log(data)
        this.store.setUser(data);

        /*TODO

        *reading*
          check 
          check /login backend route to see how jwt sent to frontend on successful login
          check userStore.js to see how jwt is being stored in frontend (this.store.user.token)

        *task*
          instead of checking substate from frontend in if condition below, make a GET api call to /checkSub
          INCLUDE JWT TOKEN in GET request header
          make new backend route /checkSub

            *in backend /checkSub route*

              1) Decrypt jwt, and make api call to db to fetch user by email inside jwt payload
                - If users does not exist return 404 status only, no body
              2) If user exists, check user.substate
                - if substate is active return 200 status only, no body
                - if substate is none return 400 status only, no body

            *frontend*

              - If status of response is 200 navigate to /dashb
              - Else navigate to /

        */

        if (this.store.user.substate === "None") {
          navigateTo("/plan");
        } else {
          navigateTo("/dashb");
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
