export async function requestToken(){
    const clientId = '38cb474460c949ddaa6e17ccbfb697e6';
    const clientSecret = '6943270911ab48b88c28b97596356dbd';
    const TokenUrl = 'https://accounts.spotify.com/api/token';
  
    const base64 = btoa(`${clientId}:${clientSecret}`);
  
    const tokenOp = {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${base64}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    };
  
    try {
      const response = await fetch(TokenUrl, tokenOp);
  
      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        return token;
        
      } else {
        console.error(`Erro ao obter token de acesso: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error('Erro na solicitação de token:', error);
      return null;
    }
  }
 