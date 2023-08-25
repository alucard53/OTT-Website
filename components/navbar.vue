<template>
  <div class="container">
    <div class="heading"><h3>OTT- Plateform</h3></div>

    <div class="search">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      <input type="search" placeholder="search" />
    </div>

    <nav>
      <ul class="nav_link">
        <li><button>SignIn</button></li>
        <li><button>LogIn</button></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;500&display=swap");

.container {
  font-family: "poppins", sans-serif;
  background-color: rgba(16, 15, 15, 0.9);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5 px 10px;
  border: 1px solid rgb(4, 4, 71);
  height: 100%;
  width: 100%;
}
.container .heading {
  background-color: rgb(4, 4, 71);
  color: white;
  padding: 0px 50px;
  border-radius: 5px;
}
.container .heading h1 {
  align-content: center;
}

h3,
li,
button {
  font-size: 16px;
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
  background-color: rgb(4, 4, 71);
  padding: 10px 10px;
  border: none;
  border-radius: 5px;
}
.nav_link li button:hover {
  background-color: rgb(39, 48, 116);
}

.container .search input {
  padding: 10px 10px;
  background-color: rgba(124, 119, 119, 0.2);
  border: none;
  color: white;
  width: 600px;
  box-shadow: none;
}

.container .search input:focus {
  outline: none;
}
.container .search svg {
  width: 20px;
  height: 30px;
  color: white;
  position: relative;
  align-items: center;
  padding: 5px;
}

.container .search {
  position: relative;
  height: 100%;
  width: 600px;
  border: 1px solid none;
  background-color: rgba(124, 119, 119, 0.2);
  font-size: 20px;
  padding: 0px 10px;
  border-radius: 25px;
  color: white;
  display: flex;
}
</style> 