export default async function refresh() {
  
    const rawResponse = await fetch(`/history`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await rawResponse.json();
  }