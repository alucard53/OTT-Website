<template>
  <NavbarComponent />
  <div class="grid grid-cols-3 gap-4 m-5">
    <div class="box" v-for="movie in movies" :key="movie.id">
      <div class="img"><img src="https://picsum.photos/200" /><br /></div>

      <h3><b>Title: </b> {{ movie.title }}</h3>
      <br />
      <h4><b>Description: </b> {{ movie.desc }}</h4>
      <br />
      <h4><b>Year: </b>{{ movie.year }}</h4>
      <br />
      <h4><b>Genre: </b>{{ movie.genre }}</h4>
      <br />
      <h4><b>Director: </b>{{ movie.director }}</h4>
      <br />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        remove from list
      </button>
      <br />
    </div>
  </div>
</template>

<script>
import { userStore } from "~/stores/userStore";

export default {
  async mounted() {
    this.store = userStore();
    const data = await fetch("http://localhost:6969/getWatchLater", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: this.store.user.email }),
    });

    console.log(data.status);

    //aap movies ko update karo toh wo show hoga

    if (data.status === 200) {
      const watchlater = await data.json();
      this.movies = watchlater.wlMovies;
      console.log(this.movies);
    }
  },
  data() {
    return {
      movies: [],
    };
  },
};
</script>


<style >
.box {
  border: 1px solid black;
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
}

.box .img {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
}
</style>