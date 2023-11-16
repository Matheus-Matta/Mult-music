export async function getArtist(token, artistId) {
  const artistUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=BR`;
  const artistOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(artistUrl, artistOptions);

    if (response.ok) {
      const data = await response.json();
      let totalStreams = 0;
     
      data.tracks.forEach((track) => {
        totalStreams += track.popularity;
      });

      const artistInfoUrl = `https://api.spotify.com/v1/artists/${artistId}`;
      const artistInfoOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const artistInfoResponse = await fetch(artistInfoUrl, artistInfoOptions);

      if (artistInfoResponse.ok) {
        const artistInfo = await artistInfoResponse.json();
        return {
          streams: totalStreams,
          image: artistInfo.images[0].url,
        };
      } 
    }
  } catch (error) {
    console.error('Error requesting artist information:', error);
    return {
      streams: 0,
      image: null,
    };
  }
}