<script setup>
  import config from 'assets/secret/key.js'

  const currentDate = ref(new Date());
  const formattedDate = ref("");

  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateParts = currentDate.value.toLocaleDateString('en-US', options).split(' ');

    formattedDate.value = `${dateParts[0].toUpperCase()} ${dateParts[1]} ${dateParts[2]}`;
  };


  const playlist = ref([]);

  import axios from 'axios';

  const clientId = config.clientId;
  const clientSecret = config.clientSecret;

  const getToken = async () => {
      const credentials = `${clientId}:${clientSecret}`;
      const base64Credentials = btoa(credentials);

      const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + base64Credentials,
          },
      });

      return response.data.access_token;
  };

  const getPlaylistTracks = async (token, playlistId) => {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
              'Authorization': 'Bearer ' + token,
          },
      });

      return response.data.items.map(item => item.track);
  };

  const getPlaylistData = async () => {
    try {
      const token = await getToken();
      const playlistId = '37i9dQZEVXbMDoHDwVN2tF';
      const topTracks = await getPlaylistTracks(token, playlistId);

      return topTracks.map((track, index) => {
        return {
          position: index + 1,
          title: track.name,
          artist: track.artists.map(artist => artist.name).join(', '),
          spotifyUrl: track.external_urls.spotify,
          image: track.album.images.length > 0 ? track.album.images[0].url : '',
        };
      });
    } catch (error) {
      console.error('Error fetching playlist data:', error);
      return [];
    }
  };

  onMounted(async () => {
    try {
      formatDate();
      playlist.value = await getPlaylistData();
    } catch (error) {
      console.error('Error in onMounted:', error);
    }
  });
</script>

<template>
  <main class="h-screen overflow-y-auto bg-gradient-to-br from-[#FFBB7C] to-[#FC7CFF] text-white px-[6%]">
    <div id="top"></div>

    <a href="#top" class="block rounded-full bg-[#00000033] absolute bottom-8 right-8 md:right-20 w-[40px] h-[40px] md:w-[50px] md:h-[50px]"><img src="img/ARROW.svg" class="w-full" style="transform: rotate(180deg);" alt=""></a>

    <header class="text-center font-Anton pt-[8vh]">
      <h1 class="text-[60px] md:text-[100px]">THE TOP 50</h1>
      <p class="text-[16px] md:text-[24px]">THE WEEK OF {{ formattedDate }}</p>
    </header>

    <div class="flex flex-col items-center gap-4 md:gap-8 py-[10vh] md:py-[14vh]">
      <SongCard v-for="song in playlist" :key="song.position" :song="song" class="w-full md:w-[650px]"/>
    </div>

    <footer class="py-[4vh] flex flex-col gap-8 text-center">
      <p class="font-light italic text-sm md:text-lg">This platform showcases Spotify's global TOP 50!<br/>I'm using their API to create an experience similar to a Billboard on Spotify.</p>
      <a href="https://portfolio.bessarion.fr" class="font-semibold text-sm md:text-base">© Maxime LEGRAND</a>
    </footer>

  </main>
</template>
