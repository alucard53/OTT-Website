<template>
  <div class="navContainer">
    <div class="heading">
      <h3>OTT - Platform</h3>
    </div>

    <div class="search">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>

      <form @submit="handleSubmit">
        <input type="search" placeholder="search" v-model="query" />
      </form>
    </div>

    <nav v-if="mounted === false">
      <ul class="nav_link">
        <li><button @click="() => navigateTo('/')">Sign Up</button></li>
        <li><button @click="() => navigateTo('/login')">Log In</button></li>
      </ul>
    </nav>
    <div v-else class="mx-5 dropdown flex flex-col items-center">
      <h3>{{ username }}</h3>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6 text-white">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <div class="dropItems">
        <button @click="() => navigateTo('/dashb')" class="dropButton">
          Account
        </button>
        <button @click="() => navigateTo('/watchLater')" class="dropButton">
          Watch Later
        </button>
        <button @click="logout" class="dropButton">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
// import register from "../pages/index.vue";
import { userStore } from "/stores/userStore";
export default {
  name: "NavbarComponent",

  beforeMount() {
    this.store = userStore();
    this.username = this.store.user.name;

    console.log(this.store.user);

    if (this.username === "") {
      this.mounted = false;
    } else {
      this.mounted = true;
    }
  },
  data() {
    return {
      query: "",
      username: "",
      mounted: false,
    };
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      navigateTo(`/search?q=${this.query}`);
    },
    logout() {
      console.log("logging out");
      this.store.setUser();
      navigateTo("/");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;500&display=swap");

.navContainer {
  font-family: "poppins", sans-serif;
  background-color: rgba(16, 15, 15, 0.9);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 0.2% 0;
}

.heading {
  background-color: #1f4c90;
  color: white;
  padding: 0.5rem 2rem;
  margin-left: 1%;
  border-radius: 5px;
}

.navContainer .heading h1 {
  align-content: center;
}

h3,
li,
button {
  font-size: 1.1em;
  font-weight: 500;
  color: white;
}

.nav_link {
  list-style: none;
}

.nav_link li {
  display: inline-block;
  padding: 0px 20px;
}

.nav_link li button {
  transition: all 0.3s ease 0s;
  background-color: #1f4c90;
  padding: 10px 10px;
  border: none;
  border-radius: 5px;
}

.nav_link li button:hover {
  background-color: rgb(39, 48, 116);
}

.search {
  display: flex;
  align-items: center;
  margin: 0 2rem;
}

.search input {
  padding: 10px 10px;
  border: none;
  color: white;
  background-color: rgba(54, 53, 53, 0.2);
  width: 90%;
  box-shadow: none;
  border-radius: 12.5px;
}

.navContainer .search input:focus {
  outline: none;
}

.navContainer .search svg {
  width: 1lh;
  height: 1lh;
  color: white;
  position: relative;
  align-items: center;
  padding: 5px;
}

.navContainer .search {
  position: relative;
  height: 100%;
  width: 30rem;
  border: 1px solid none;
  background-color: rgba(124, 119, 119, 0.2);
  font-size: 20px;
  padding: 0px 10px;
  border-radius: 25px;
  color: white;
  display: flex;
}

.dropdown {
  display: flex;
  cursor: pointer;
}

.dropItems {
  display: none;
  top: 5.4%;
  position: absolute;
  box-shadow: 0px 0px 10px 3px #2c56be;
  background-color: rgb(46, 44, 44);
  z-index: 1;
  border-radius: 0.2rem;
}

.dropdown:hover .dropItems {
  display: flex;
  flex-direction: column;
  width: 13rem;
  overflow: hidden;
}

.dropButton {
  margin: 1px;
}

.dropButton:hover {
  margin: 0;
  border: 1px solid white;
}
</style> 
