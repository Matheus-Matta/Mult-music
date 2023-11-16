export async function getCategories(token) {
  const categoriesUrl = "https://api.spotify.com/v1/browse/categories?country=BR&locale=pt_BR";
  const categoriesOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(categoriesUrl, categoriesOptions);

    if (response.ok) {
      const cat = await response.json();
      const categories = cat.categories.items;
      const array = new Array();
     for(var i = 1;i<categories.length;i++){
       const info = await  getCategoryPlaylists(token,categories[i].id)

       if(info == null){
         continue
       }

       let object = {
        idCat: categories[i].id,
        id: info.id,
        name: info.name,
        image: info.images[0].url,
        descrição: info.description,
      }
      array.push(object)
     }
      return array;
    } else {
      console.error(`Erro ao obter categorias: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error("Erro na solicitação de categorias:", error);
    return [];
  }
}

export async function getCategoryPlaylists(token, categoryId) {
  const categoryPlaylistsUrl = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`;
  const categoryPlaylistsOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(categoryPlaylistsUrl, categoryPlaylistsOptions);

    if (response.ok) {
      const data = await response.json();
      const playlists = data.playlists.items;
      return playlists[0];
    } else {
      console.error(`Erro ao obter playlists da categoria: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error("Erro na solicitação de playlists da categoria:", error);
    return [];
  }
}