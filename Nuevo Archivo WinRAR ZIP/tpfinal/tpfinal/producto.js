const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    const productDetail = document.querySelector('.producto-detail');

    const producto = data.find(producto => producto.id == id);

    productDetail.innerHTML = `
      <div class="producto">
        <img src="${producto.imagen}" alt="${producto.titulo}">
        <div class="details">
          <h1>${producto.titulo}</h1>
          <p>${producto.descripcion}</p>
          <p><strong>Precio:</strong> $${producto.precio}</p>
          <button onClick="addToCart(${producto.id})" class="btn-comprar">Agregar al Carrito</button>
        </div>
      </div>`;
  })
  .catch(error => console.error('Error al leer el archivo JSON:', error));
