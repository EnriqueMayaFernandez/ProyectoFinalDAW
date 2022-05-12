const respuesta = (apiResponse) => {
    return apiResponse;
  };



export default function putUsuarios(usuario,id) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  };
  fetch("http://localhost:3333/api/usuarios/"+id, requestOptions)
    .then((response) => response.json())
    .then(respuesta);
}