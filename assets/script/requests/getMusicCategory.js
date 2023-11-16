import { requestToken } from "./requestToken.js";

export async function getMusicCategory(playlistId){
    const token = await requestToken()  
    const playlistTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const playlistTracksOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await fetch(playlistTracksUrl, playlistTracksOptions);
  
      if (response.ok) {
        const data = await response.json();
        const tracks = data.items;
        return tracks;
      } else {
        console.error(`Erro ao obter faixas da playlist: ${response.status}`);
        return [];
      }
    } catch (error) {
      console.error("Erro na solicitação de faixas da playlist:", error);
      return [];
    }
}