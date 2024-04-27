export async function post(url: string, parametro: any){
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parametro)
    };
    
    const response = await fetch(url, requestOptions);

    const responseData = await response.json();

    return responseData;
};
