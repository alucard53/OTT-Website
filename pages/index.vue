<template>
  <div>
    <!-- <NavbarComponent /> -->
    <div class="page">
      <div class="container">
        <form class="form" @submit="handleSubmit">
          <h2 class="heading">Sign Up</h2>

          <span class="inputGroup">
            <label for="name" class="label"> Name </label>

            <input type="text" class="input" v-model="form.name" required />
          </span>

          <span class="inputGroup">
            <label for="email" class="label"> Email </label>

            <input type="email" class="input" v-model="form.email" required />
          </span>

          <span class="inputGroup">
            <label for="password" class="label"> Password </label>

            <input
              type="password"
              class="input"
              v-model="form.password"
              required
            />

            <label for="remember_me" style="color: #fff">
              <input type="checkbox" />
              Remember me
            </label>
          </span>

          <img
            v-if="loading"
            src="../public/loading.gif"
            width="50"
            height="50"
          />

          <div v-if="err.length > 0" style="color: red">
            {{ err }}
          </div>

          <button type="submit" class="Submit">Sign Up</button>

          <p style="font-weight: 500; color: #fff">
            Already have an account?
            <NuxtLink to="/login" style="color: #8798ab">Sign In</NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      err: "",
      form: {
        name: "",
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
        const data = await fetch("http://localhost:6969/register", {
          method: "POST",
          body: JSON.stringify(this.form),
          headers: {
            "Content-Type": "application/json",
          },
        });

        this.loading = false;
        if (data.status === 200) {
          navigateTo("/login");
        } else if (data.status === 400) {
          this.err = "Email already exists";
        } else {
          this.err = "Server error, try again later";
        }
      } catch (e) {
        this.err = "Network error, try again later";
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
  border-radius: 3%;
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
  border-radius: 8px;
  color: #fff;
  outline: none;
  box-sizing: border-box;
  font-size: large;
}

.Submit {
  background-color: #091636;
  box-shadow: 4px 4px #f5f5f516;
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  margin: 5%;
  font-size: larger;
  color: white;
}

.Submit:hover {
  box-shadow: 4px 4px #f5f5f585;
  background-color: #213760;
  transition: all 0.3s ease 0s;
}
</style>
