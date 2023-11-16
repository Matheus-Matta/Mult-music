import { requestToken } from "./requestToken.js";

export async function getAlbumTracks(albumId) {
    const token = await requestToken();

    const albumTracksUrl = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
  
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
  
    try {
      const response = await fetch(albumTracksUrl, options);
  
      if (response.ok) {
        const data = await response.json();
        const tracks = data.items;
        return tracks;
      } else {
        console.error(`Erro ao obter as faixas do álbum: ${response.status}`);
        return [];
      }
    } catch (error) {
      console.error('Erro na solicitação das faixas do álbum:', error);
      return [];
    }
  }
  