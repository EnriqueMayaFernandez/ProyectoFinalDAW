const respuesta = (apiResponse) => {
  const { data = [] } = apiResponse;
  if (Array.isArray(data)) {
    const usuarios = data.map((usuario) => {
      const { id, nombreUsuario, clave, tipo } = usuario;
      return {
        id,
        nombreUsuario,
        clave,
        tipo,
      };
    });
    return usuarios;
  }
  return [];
};

export default function getUsuarios() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  };
  fetch("http://localhost:3333/api/usuarios", requestOptions)
    .then((response) => response.json())
    .then(respuesta);
}
