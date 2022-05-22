
export default function getUsuarios() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  };
  fetch("http://localhost:3333/api/usuarios", requestOptions)
    .then((response) => response.json())
    console.log(response.data)
    return response.data;
}
