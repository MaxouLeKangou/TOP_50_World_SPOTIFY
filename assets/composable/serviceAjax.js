import axios from 'axios'
import dotenv from "dotenv";

dotenv.config();

const clientId = process.env.SPOTIFY_API_CLIENT;
const clientSecret = process.env.SPOTIFY_API_KEY;

const getToken = async () => {
    console.log(clientId, clientSecret);
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

export const getPlaylistData = async () => {
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