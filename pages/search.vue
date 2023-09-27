<template>
  <NavbarComponent />
  <div class="grid grid-cols-3 gap-4 m-5">
    <div class="box" v-for="movie, index in filteredMovies" :key="movie.id">
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
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" v-if="movie.watchlater">Watch
        later</button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" v-else
        @click="addWatch(index)">Add
        to Watch
        later</button>
      <br />
    </div>
  </div>
</template>

<script>
import { userStore } from '~/stores/userStore';

export default {
  async created() {
    this.store = userStore()
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

      for (let i in this.movies) {
        const res = await fetch(`http://localhost:6969/checkWatch?movie=${this.movies[i].id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: this.store.user.email })
        })

        if (res.status === 200) {
          this.movies[i].watchlater = true
        }
      }
    }
  },
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    async addWatch(i) {
      this.movies[i].watchlater = true

      const res = await fetch(`http://localhost:6969/addWatch?movie=${this.movies[i].id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.store.user.token}`
        }
      }
      )

      console.log(res.status)
    }
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