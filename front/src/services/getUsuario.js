export default async function getUsuario(nombre, clave) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  };
  try {
    const response = await fetch(
      "http://localhost:3333/api/login/" + nombre + "&" + clave,
      requestOptions
    ); //.catch(alert("El usuario o la contraseña no existen"));
    const data = await response.json();
    console.log(data);
    window.localStorage.setItem("usuarioLogin", JSON.stringify(data));
    return data;
  } catch (err) {
    console.log(err);
  }
}
