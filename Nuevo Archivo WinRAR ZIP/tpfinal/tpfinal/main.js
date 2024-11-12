fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    const productosGrid = document.querySelector('.productos-grid');
    data.forEach(producto => {
      const productoHTML = `
                <div class="producto-card">
                    <img src="${producto.imagen}" alt="${producto.titulo}">
                    <h3>${producto.titulo}</h3>
                    <p>$${producto.precio}</p>
                    <a href="producto.html?id=${producto.id}" class="btn-ver-mas">Ver más</a>
                    <button onClick="addToCart(${producto.id})" class="btn-comprar">Agregar al Carrito</button>
                </div>
            `;

      productosGrid.innerHTML += productoHTML;
    });
  })
  .catch(error => console.error('Error al leer el archivo JSON:', error));

const buscar = () => {
  const search = document.querySelector('#busqueda');
  const searchValue = search.value.toLowerCase();
  const productos = document.querySelectorAll('.producto-card');

  productos.forEach(producto => {
    const title = producto.querySelector('h3').textContent.toLowerCase();
    if (title.includes(searchValue)) {
      producto.style.display = 'block';
    } else {
      producto.style.display = 'none';
    }
  });
}

const enviarform = (e) => {
  e.preventDefault();
  Toastify({
    text: "Formulario enviado",
    duration: 2000,
    position: 'center',
  }).showToast();
  e.target.reset();
}