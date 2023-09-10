<template>
  <NavbarComponent />
  <div class="grid grid-cols-3 gap-4 m-5" @submit="handleSearch">
    <div class="box" v-for="movie in handleSearch" :key="movie.id">
      <div class="img"><img src="https://picsum.photos/200" /><br /></div>

      <!-- <div v-for="det in movie" :key="det">{{ det }}</div> -->

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
  mounted() {
    console.log(this.$route.query);
  },
  data() {
    return {
      movies: {
        id: "",
        title: "",
        genre: "",
        director: "",
        year: "",
        desc: "",
      },
    };
  },
  methods: {
    async handleSearch(event) {
      event.preventDefault();

      const data = await fetch("http://localhost:6969/movies", {
        method: "Post",
        body: JSON.stringify(this.movies),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (
        this.title ===
        data.title
          .toLowerCase()
          .includes(this.$route.query.q.toLocaleLowerCase())
      ) {
        const movie = await data.json();
        console.log(movie);
        res.write(movie);
      }
    },
  },
  // computed: {
  //   filteredMovies() {
  //     // return this.movies.filter((movie) => movie.title === "Forest of Love");
  //     return this.movies.filter((movie) =>
  //       movie.title.toLowerCase().includes(this.$route.query.q.toLowerCase())
  //     );
  //   },
  // },
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