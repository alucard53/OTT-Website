<template>
  <NavbarComponent />
  <div class="container">
    <div v-for="movie in filteredMovies" :key="movie.id">
      {{ movie.title }}
      <br />
      {{ movie.desc }}
      <br />
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
      movies: [
        {
          id: 1,
          title: "Shinchan: Bungle In The Jungle",
          desc: "Shinnosuke and his parents including Shiro along with his friends and families go on a cruise to for several days to meet the actor of the character Action Kamen and watch the latest film of Action Kamen. But a group of monkeys raid the ship and all of the adults who are present at the ship above 18 years are taken to an island at night. Shinnosuke and his friends including Himawari and Shiro start their journey to rescue all of them. They meet Paradise King, who is controlling the monkeys. They succeed to rescue them and return to ship, but Paradise King attacks them back. Shinnosuke and Action Kamen fight back and defeat him. Later all of them enjoy the Action Kamen film.",
        },
        {
          id: 2,
          title: "Forest of Love",
          desc: "A group of aspiring filmmakers decide that a charismatic scammer and his turbulent relationships are the perfect subject, but soon lies are indistinguishable from truth and the limits of humanity are tested.",
        },
        {
          id: 3,
          title: "Eternal Sunshine of the Spotless Mind",
          desc: "Joel and Clementine begin a relationship after a train journey together. However, having had their memories clinically erased, they do not remember their tumultuous past.",
        },
      ],
    };
  },
  computed: {
    filteredMovies() {
      // return this.movies.filter((movie) => movie.title === "Forest of Love");
      return this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(this.$route.query.q.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
</style>