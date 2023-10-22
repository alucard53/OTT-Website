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
        <NuxtLink to="/search?g=comedy">
          <button class="dropButton">
            comedy
          </button>
        </NuxtLink>
        <NuxtLink :to="`/search?g=${'slice of life'}`">
          <button class="dropButton"> slice of life </button>
        </NuxtLink>
        <NuxtLink to="/search?g=comedy">
          <button class="dropButton">thriller</button>
        </NuxtLink>
      </div>
    </div>

    <div class="mx-5 dropdown flex flex-col items-center">
      <button>sort by fit</button>

      <div class="dropItems">

        <button class="dropButton">
          <NuxtLink :to="`/search?s=latest&q=${query}`">
            latest
          </NuxtLink>
        </button>
        <button class="dropButton">

          <NuxtLink :to="`/search?s=earliest&q=${query}`">
            earliest
          </NuxtLink>
        </button>
        <button class="dropButton">
          <NuxtLink :to="`/search?s=a-z&q=${query}`">
            a-z
          </NuxtLink>
        </button>
        <button class="dropButton">
          <NuxtLink :to="`/search?s=z-a&q=${query}`">
            z-a
          </NuxtLink>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import register from "../pages/index.vue";

export default {
  name: "FilterBar",

  mounted() {
    console.log(this.$route.query)
    this.query = this.$route.query.q || ""
  },

  data() {
    return {
      query: this.$route.query.q
    };
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
  top: 9%;
  position: absolute;
  box-shadow: 0px 0px 10px 3px #2c56be;
  background-color: rgb(46, 44, 44);
  z-index: 1;
  border-radius: 0.2rem;
}

.dropdown:hover .dropItems {
  display: flex;
  flex-direction: column;
  padding: 0 1.5%;
  overflow: hidden;
}

.dropItems:first-child {
  margin-left: 50px;
}

.dropButton {
  margin: 1px;
}

.dropButton:hover {
  margin: 0;
  border: 1px solid white;
}
</style> 
