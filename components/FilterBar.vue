<template>
  <div class="navContainer">

    <div class="mx-5 pl-10 flex flex-row items-center cursor-pointer dropdown">
      <button>Genre</button>

      <div class="dropItems">
        <NuxtLink to="/search?g=comedy">
          <button class="dropButton">comedy</button>
        </NuxtLink>
        <NuxtLink :to="`/search?g=${'slice of life'}`">
          <button class="dropButton">slice of life</button>
        </NuxtLink>
        <NuxtLink to="/search?g=comedy">
          <button class="dropButton">thriller</button>
        </NuxtLink>
      </div>
    </div>

    <div class="mx-5 dropdown flex flex-col items-center">
      <div class="sort">
        <button>sort by fit</button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
      </div>

      <div class="dropItems">
        <button class="dropButton">
          <NuxtLink :to="`/search?s=latest&q=${query}`"> latest </NuxtLink>
        </button>
        <button class="dropButton">
          <NuxtLink :to="`/search?s=earliest&q=${query}`"> earliest </NuxtLink>
        </button>
        <button class="dropButton">
          <NuxtLink :to="`/search?s=a-z&q=${query}`"> a-z </NuxtLink>
        </button>
        <button class="dropButton">
          <NuxtLink :to="`/search?s=z-a&q=${query}`"> z-a </NuxtLink>
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
    console.log(this.$route.query);
    this.query = this.$route.query.q || "";
  },

  data() {
    return {
      query: this.$route.query.q,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;500&display=swap");

.navContainer {
  font-family: "poppins", sans-serif;
  background-color: #091636;

  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 0.2% 0;
  margin-top: 1px;
}

h3,
li,
button {
  font-size: 1.1em;
  font-weight: 500;
  color: white;
  margin: 8px;
}


.dropItems {
  display: none;
  top: 11%;
  position: absolute;
  box-shadow: 0px 0px 10px 3px #091636;
  background-color: rgb(46, 44, 44);
  z-index: 1;
  border-radius: 0.2rem;
}

.dropdown:hover .dropItems {
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* .dropItems:first-child {
  margin-left: 50px;
} */

.dropButton {
  margin: 1px;
  width: 100%;
  padding: 0 1rem;
}

.dropButton:hover {
  margin: 0;
  /* border: 1px solid white; */
  background-color: #ffffff;
  color: #091636;
}

.sort {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.sort svg {
  width: 35px;
  height: 35px;
  color: white;
  position: relative;
  align-items: center;
  padding: 5px;
  margin-right: 55px;
}
</style> 
