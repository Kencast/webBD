

export async function getData(url: string) {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
  
      const data = await response.json();
  
      return data.items;
    } catch (error) {
      console.error('Error al realizar la solicitud getData:', error);
      return []
    }
  }