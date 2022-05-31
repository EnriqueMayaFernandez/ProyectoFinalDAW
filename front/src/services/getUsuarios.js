export default async function getUsuarios() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  };
  try {
    const response = await fetch(
      "http://localhost:3333/api/usuarios",
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
