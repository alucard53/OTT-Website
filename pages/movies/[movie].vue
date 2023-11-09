<template>
  <NavbarComponent />
  <div class="page">
    <div class="container">
      <div class="video">
        <video controls width="1280" height="720">
          <source src="http://localhost:5000/video?q=a2" type="video/mp4" />
        </video>
      </div>
    </div>
    <span class="text-3xl mt-5">Movie Title</span>
  </div>
</template>

<script>
export default {

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

}

.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>