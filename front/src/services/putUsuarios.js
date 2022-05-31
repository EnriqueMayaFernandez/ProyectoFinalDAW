const respuesta = (apiResponse) => {
  return apiResponse;
};

export default function putUsuarios(usuario, id) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  };
  fetch("http://localhost:3333/api/usuarios/" + id, requestOptions)
    .then(async (response) => {
      console.log(response.json());
      if (response.ok) {
        await window.localStorage.setItem("navegar", 1);
        return Promise.resolve();
      } else if (!response.ok && response.status === 400) {
        const error = "El nombre de usuario ya existe";
        return Promise.reject(error);
      } else {
        const error = "Ha ocurrido un error inexperado";
        return Promise.reject(error);
      }
    })
    .catch((error) => {
      window.localStorage.setItem("navegar", 0);
      alert(error);
    });
}
