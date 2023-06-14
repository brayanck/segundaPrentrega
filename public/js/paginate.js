const prev = document.getElementById("prevPage");
const next = document.getElementById("nextPage");
let container = document.getElementById("container")
const setProducts = (data) => {
    
    container.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src="${data.image}" class="card-img-top" alt="${data.name}">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.price}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
    </div>
`
}
const render = (data)=>{
    const div = document.createElement("div")
    div.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${data.image}" class="card-img-top" alt="${data.name}">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.price}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
        </div>
    `
}
const setLinks = (prevPage, nextPage) => {
    prev.href = prevPage;
    next.href = nextPage;
    prev.textContent = `pagina ${prevPage}`;
    next.textContent = `pagina ${nextPage}`;
};
const getProductos = () => {
    fetch('/pag')
      .then(response => response.json())
      .then(data => {
        // Aquí puedes trabajar con los datos obtenidos del servidor
        console.log(data);
        let products = data.docs;
        products.forEach(setProducts);
        let prevPage = data.products.prevPage;
        let nextPage = data.products.nextPage;
        setLinks(prevPage, nextPage);
      })
      .catch(error => {
        // Manejo de errores
        console.log(error);
      });
  }
getProductos()

next.addEventListener("click",(e)=>{
    e.preventDefault()
    let parametros={
        page: next.href
    }
    enviarPaginacion(parametros)
})
prev.addEventListener("click",(e)=>{
    e.preventDefault()
    let parametros={
        page: prev.href
    }
    enviarPaginacion(parametros)
})

function enviarPaginacion(parametros) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/pag', true);
  
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 400) {
        const data = JSON.parse(xhr.responseText);
        let products = data.docs;
        container = "";
        products.forEach(setProducts);
        let prevPage = data.prevPage;
        let nextPage = data.nextPage;
        setLinks(prevPage, nextPage);
      } else {
        console.error('Error en la petición');
      }
    };
  
    xhr.onerror = function() {
      console.error('Error en la petición');
    };
  
    xhr.send(parametros);
  }