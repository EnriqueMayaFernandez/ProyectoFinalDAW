const respuesta = (apiResponse) => {
    return apiResponse;
  };



export default function postUsuarios(usuario) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  };
  fetch("http://localhost:3333/api/usuarios", requestOptions)
    .then((response) => response.json())
    .then(respuesta);
}