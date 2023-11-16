export async function getTop50Playlist(token) {
  const playlistId = '37i9dQZEVXbMDoHDwVN2tF'; // ID da playlist "Top 50 Mais Ouvidas"

  const playlistUrl = `https://api.spotify.com/v1/playlists/${playlistId}`;

  const playlistOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(playlistUrl, playlistOptions);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Error obtaining playlist information: ${response.status}`);
    }
  } catch (error) {
    console.error('Error requesting playlist information:', error);
  }
}


