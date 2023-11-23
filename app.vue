<script setup>
  import { getPlaylistData } from 'assets/composable/serviceAjax.js';

  const scrollToTop = () => {
    const topElement = document.getElementById('top');
    topElement.scrollIntoView({ behavior: 'smooth' });
  };

  const currentDate = ref(new Date());
  const formattedDate = ref("");

  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateParts = currentDate.value.toLocaleDateString('en-US', options).split(' ');
    formattedDate.value = `${dateParts[0].toUpperCase()} ${dateParts[1]} ${dateParts[2]}`;
  };

  const playlist = ref([]);

  onMounted(async () => {
    formatDate();
    playlist.value = await getPlaylistData();
  });
</script>

<template>
  <main class="h-screen overflow-y-auto bg-gradient-to-br from-[#FFBB7C] to-[#FC7CFF] text-white px-[6%]">
    <div id="top"></div>

    <button id="top" @click="scrollToTop" class="block rounded-full bg-[#00000033] absolute bottom-8 right-8 w-[40px] h-[40px] md:w-[50px] md:h-[50px]"><IconArrow class="w-full" style="transform: rotate(180deg);"/></button>


    <header class="text-center font-Anton pt-[8vh]">
      <h1 class="text-[60px] md:text-[100px]">THE TOP 50</h1>
      <p class="text-[16px] md:text-[24px]">THE WEEK OF {{ formattedDate }}</p>
    </header>

    <div class="flex flex-col items-center gap-4 md:gap-6 py-[10vh] md:py-[14vh]">
      <SongCard v-for="song in playlist" :key="song.position" :song="song" class="w-full md:w-[650px]"/>
    </div>


    <footer class="py-[4vh] flex flex-col gap-8 text-center">
      <p class="font-light italic text-sm md:text-lg">This platform showcases Spotify's global TOP 50!<br/>I'm using their API to create an experience similar to a Billboard on Spotify.</p>
      <a href="https://portfolio.bessarion.fr" class="font-semibold text-sm md:text-base">© Maxime LEGRAND</a>
    </footer>

  </main>
</template>