const callToApi = () => {
  // Llamamos a la API
  return fetch('https://dev.adalab.es/api/random/word') 
    .then((response) => response.json())
    .then((response) => {
      // Cuando responde la API podemos limpiar los datos aquí
      const result = response.word
      return result;
    });
};

export default callToApi; 