<template>
  <NavbarComponent />
  <div class="grid grid-cols-3 gap-4 m-5">
    <div class="box" v-for="movie in filteredMovies" :key="movie.id">
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
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    console.log(this.$route.query);
    const data = await fetch("http://localhost:6969/movies", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.status != 200) {
      console.log("Error in fetching movies data from db")
    } else {
      this.movies = await data.json();
    }
  },
  data() {
    return {
      movies: [],
    };
  },
  computed: {
    filteredMovies() {
      return this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(this.$route.query.q.toLowerCase())
      );
    },
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