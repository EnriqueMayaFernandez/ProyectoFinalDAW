const respuesta = (apiResponse) => {
    return apiResponse;
  };



export default function deleteUsuarios(id) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  };
  fetch("http://localhost:3333/api/usuarios/"+id, requestOptions)
    .then((response) => response.json())
    .then(respuesta);
}