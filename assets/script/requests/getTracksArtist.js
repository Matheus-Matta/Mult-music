
export async function getTracksArtist(token, artistId) {
  const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;
  const albumsUrl = `https://api.spotify.com/v1/artists/${artistId}/albums`;
  const topTracksUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=BR`;

  const artistOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const [artistResponse, albumsResponse, topTracksResponse] = await Promise.all([
      fetch(artistUrl, artistOptions),
      fetch(albumsUrl, artistOptions),
      fetch(topTracksUrl, artistOptions),
    ]);

    if (artistResponse.ok && albumsResponse.ok && topTracksResponse.ok) {
      const artistData = await artistResponse.json();
      const albumsData = await albumsResponse.json();
      const tracksData = await topTracksResponse.json();

      const artist = artistData;
      const albums = albumsData;
      const tracks = tracksData;
      return {
        artist,
        albums,
        tracks,
      };
    } else {
      console.error(`Erro nas solicitações do artista, álbuns ou melhores faixas: ${artistResponse.status} | ${albumsResponse.status} | ${topTracksResponse.status}`);
      return {};
    }
  } catch (error) {
    console.error('Erro nas solicitações do artista, álbuns ou melhores faixas:', error);
    return {};
  }
}