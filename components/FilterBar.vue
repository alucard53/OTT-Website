<template>
  <div class="navContainer">
    <!-- <nav v-if="mounted === false">
      <ul class="nav_link">
        <li><button @click="() => navigateTo('/')">Sign Up</button></li>
        <li><button @click="() => navigateTo('/login')">Log In</button></li>
      </ul>
    </nav> -->

    <div class="mx-5 dropdown flex flex-col items-center">
      <button>Genre</button>

      <div class="dropItems">
        <button @click="handleSubmit('comedy')" class="dropButton">
          comedy
        </button>
        <button @click="handleSubmit('slice of life')" class="dropButton">
          slice of life
        </button>
        <button @click="handleSubmit('thriller')" class="dropButton">
          thriller
        </button>
      </div>
    </div>

    <div class="mx-5 dropdown flex flex-col items-center">
      <button>sort by fit</button>

      <div class="dropItems">
        <button class="dropButton">latest</button>
        <button class="dropButton">earliest</button>
        <button class="dropButton">a-z</button>
        <button class="dropButton">z-a</button>
      </div>
    </div>
  </div>
</template>

<script>
// import register from "../pages/index.vue";

export default {
  name: "FilterBar",

  data() {
    return {
      query: "",
      genre: "",
    };
  },
  methods: {
    handleSubmit(genreName) {
      this.genre = genreName;
      navigateTo(`/search?q=${this.query}&g=${this.genre}`);
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

h3,
li,
button {
  font-size: 1.1em;
  font-weight: 500;
  color: white;
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
