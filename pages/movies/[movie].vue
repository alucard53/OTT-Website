<template>
  <NavbarComponent />
  <div class="page">
    <div class="container">
      <div class="video">
        <video controls width="1000" height="1000" id="video">
        </video>
      </div>
      <div class="flex flex-col w-full mt-10 p-8 bg-gray-800 rounded-md text-white ">
        <span class="text-4xl font-bold mb-4 pl-6">{{ movie.title }}</span>
        <span class="text-2xl font-semibold mb-1 pl-6">Summary</span>
        <span class="mb-8 pl-6">{{ movie.desc }}</span>
        <div class="flex w-full justify-center items-center">
          <div class="grid grid-cols-3 gap-x-40 gap-y-2 text-center">
            <span class="text-xl font-semibold">Director</span>
            <span class="text-xl font-semibold">Genre</span>
            <span class="text-xl font-semibold">Year</span>
            <span class="text-lg pt-5 px-20 border-t-2 border-t-white">{{ movie.director }}</span>
            <span class="text-lg pt-5 border-t-2 border-t-white">{{ movie.genre }}</span>
            <span class="text-lg pt-5 border-t-2 border-t-white">{{ movie.year }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userStore } from "~/stores/userStore";

export default {
  async beforeMount() {
    this.video = document.getElementById("video")
    this.id = this.$route.path.substring(8, this.$route.path.length)
    this.store = userStore();

    const res = await fetch(`http://localhost:6969/stream/${this.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.store.user.token}`,
      }
    })

    if (res.status === 200) {
      this.movie = await res.json()
      video.src = `http://localhost:5000/video/${this.id}`
      video.play()
    } else {
        navigateTo('/dashb')
    }
  },

  data() {
    return {
      movie: {
        title: "",
        year: 0,
        desc: "",
        genre: "",
        director: "",
      },
    }
  }
}
</script>

<style scoped>
.page {
  display: flex;
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #181818;
}

.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
