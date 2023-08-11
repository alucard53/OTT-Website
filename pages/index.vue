<template>
  <div class="page">
    <div class="container">
      <form class="form" @submit="handleSubmit">
        <h2 class="heading">Create Account</h2>

        <span class="inputGroup">
          <label for="name" class="label">
            Name
          </label>

          <input type="text" class="input" v-model="form.name" required>
        </span>

        <span class="inputGroup">
          <label for="email" class="label">
            Email
          </label>

          <input type="email" class="input" v-model="form.email" required>
        </span>

        <span class="inputGroup">
          <label for="password" class="label">
            Password
          </label>

          <input type="password" class="input" v-model="form.password" required>

          <label for="remember_me">
            <input type="checkbox">
            Remember me
          </label>
        </span>

        <div v-if="this.err.length > 0" style="color: red;">
          {{ err }}
        </div>

        <input type="submit" value="Sign up" class="Submit">

        <p style="font-weight: 500;">
          Already have an account? <NuxtLink to="/login" style="color: #1f4c90;">Log In</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      err: "",
      form: {
        name: '',
        email: '',
        password: '',
      },
    }
  },

  methods: {
    async handleSubmit(event) {
      this.err = ""
      event.preventDefault()
      console.log(this.form)
      const data = await fetch('/register', {
        method: 'POST',
        body: JSON.stringify(this.form)
      })
      const res = await data.json()

      if (res.status === "OK") {
        navigateTo('/login')
      } else {
        this.err = res.status
      }
    }
  }
}
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