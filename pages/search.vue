<template>
  <NavbarComponent />
  <FilterBar />
  <div class="grid grid-cols-3 gap-4 m-5">
    <div class="box" v-for="(movie, index) in filteredMovies" :key="movie.id">
      <NuxtLink :to="`/movies/${movie.id}`">
        <div class="img"><img src="https://picsum.photos/200" /><br /></div>
      </NuxtLink>

      <div class="content">
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

      <div class="button">
        <button class="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded" v-if="movie.watchLater">
          <NuxtLink to="/watchLater">Watch later</NuxtLink>
        </button>

        <button class="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded" v-else
          @click="addWatch(index)">
          Add to Watch later
        </button>
      </div>

      <br />
    </div>
  </div>
</template>

<script>
import { userStore } from "~/stores/userStore";

export default {
  async mounted() {
    this.store = userStore();
    console.log(this.store.user.email);
    try {
      const data = await fetch("http://localhost:6969/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.store.user.email,
        }),
      });

      if (data.status != 200) {
        console.log("Error in fetching movies data from db");
      } else {
        this.movies = await data.json();
      }
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    async addWatch(i) {
      this.filteredMovies[i].watchLater = true;

      const res = await fetch(
        `http://localhost:6969/addWatch?movie=${this.filteredMovies[i].id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.store.user.token}`,
          },
        }
      );

      console.log(res.status);
    },
  },
  computed: {
    filteredMovies() {
      if (this.$route.query.g) {
        return this.movies.filter((movie) =>
          movie.genre.toLowerCase().includes(this.$route.query.g.toLowerCase())
        );
      } else if (this.$route.query.s) {
        switch (this.$route.query.s) {
          case "a-z":
            this.movies.sort((a, b) => {
              let fa = a.title.toLowerCase(),
                fb = b.title.toLowerCase();
              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            });
            break;
          case "z-a":
            this.movies.sort((a, b) => {
              let fa = a.title.toLowerCase(),
                fb = b.title.toLowerCase();
              if (fa > fb) {
                return -1;
              }
              if (fa < fb) {
                return 1;
              }
              return 0;
            });
            break;
          case "earliest":
            this.movies.sort((a, b) => {
              let fa = a.year,
                fb = b.year;
              return fa - fb;
            });
            break;
          case "latest":
            this.movies.sort((a, b) => {
              let fa = a.year,
                fb = b.year;
              return fb - fa;
            });
            break;
        }
      }
      for (let movie of this.movies) {
        console.log(movie.title);
      }
      return this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(this.$route.query.q.toLowerCase())
      );
    },
  },
};
</script>

<style >
.box {
  /* border: 1px solid black; */
  background-color: #d9d9d9;
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px;
  margin: 10px;
}

.box .img {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

.content {
  padding: 10px;
  margin: 10px;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
