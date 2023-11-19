<template>
  <a :href="song.spotifyUrl" class="block border-2 border-[#FFFFFF33] rounded-2xl bg-[#FFFFFF1A] py-2 pr-2 md:py-5 md:pr-5">
    <div class="flex"> <!-- Utilise justify-between pour aligner à droite -->
      <div class="flex items-center">
        <span class="text-center font-Anton align-middle w-[60px] md:w-[100px] text-xl md:text-4xl">#{{ song.position }}</span>
      </div>
      <div class="flex justify-between w-full">
          <div class="flex gap-3 md:gap-5">
            <img :src="song.image" alt="Album Cover" class="rounded-2xl h-[60px] w-[60px] md:h-[80px] md:w-[80px]">
            <div class="flex flex-col justify-center whitespace-nowrap max-w-[130px] md:max-w-[350px]">
              <h2 class="font-Anton uppercase items-center overflow-hidden overflow-ellipsis text-lg md:text-2xl">{{ song.title }}</h2>
              <p class="font-Poppins font-normal text-[#FFFFFFBF] overflow-hidden overflow-ellipsis text-xs md:text-base">{{ song.artist }}</p>
            </div>
          </div>
          <div class="flex items-center"> <!-- L'élément sera aligné à droite -->
            <img src="img/PLAY.svg" alt="Icon to play the song on Spotify" class="w-6 h-6 md:w-10 md:h-10">
          </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    song: {
      type: Object,
    },
  },
};
</script>
