import {getTracksArtist} from "../requests/getTracksArtist.js"; // (token,artist_id)

export async function getSearch(token,query) {
  if(query == ""){
    return false;
  } else if (query[0] == " "){
      for(var i = 0;i < query.length;i+0){
        if(query[i] == " "){
          i++;
          if( i == query.length){
            return null;
          }
      } else {
        break;
      }
    }
  }
  const searchUrl = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=20`;
  const searchOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(searchUrl, searchOptions);

    if (response.ok) {
      const data = await response.json();
      const result = data.tracks.items;
      let artistResult = {
         id: result[0].artists[0].id,
         name: result[0].artists[0].name,
      }
      let songResult = {
         id: result[0].id,
         name: result[0].name,
         duração:(data.tracks.items[0].duration_ms / 60000).toFixed(2).replace(".",":"),
         image:data.tracks.items[0].album.images[0].url,
         outros: data.tracks.items,
      }
      const data2 =  await getTracksArtist(token,artistResult.id)
      let albuns = data2.albums;
      let tracks = data2.tracks;
      let artist = data2.artist;
      return {
        artistResult:  artistResult,
        songResult: songResult,
        albums: albuns,
        tracks: tracks,
        artist: artist,
      }
    } else {
      console.error(``);
      return [];
    }
  } catch (error) {
    console.error("");
    return [];
  }
}


