
export default async function convert(currency, value) {
    const rawResponse = await fetch(`/exchange-rate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency,
        value
      }),
    });
    return await rawResponse.json();
  }