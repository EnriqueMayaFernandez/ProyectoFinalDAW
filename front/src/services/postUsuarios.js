

export default function postUsuarios(usuario) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  };

  fetch("http://localhost:3333/api/usuarios", requestOptions)
    .then( async response => {
      const data= await response.json();
      if(response.ok){
       return true;
      }
      else if(!response.ok && response.status===400){
        const error = "El nombre de usuario ya existe";
        return Promise.reject(error);
      }else{
        const error = "Ha ocurrido un error inexperado";
        return Promise.reject(error);
      }
    }).catch(error => {
      alert(error)
    })
}