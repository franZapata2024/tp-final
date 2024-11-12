const carritoGrid = document.querySelector('.carrito-grid');

const actualizarCarritoUI = () => {
  const productos = JSON.parse(localStorage.getItem('cart')) || [];

  if (!carritoGrid) return;

  if (productos.length === 0) {
    carrito.innerHTML = '<p class="cart-message">No hay productos en el carrito</p>';
    document.querySelector('.boton-continuar').remove();
  } else {
    carritoGrid.innerHTML = '';

    productos.forEach(producto => {
      const productoHTML = `
        <div class="producto-card">
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <h3>${producto.titulo}</h3>
            <p>$${producto.precio}</p>
            <div class="counter">
              <button onClick="removeOne(${producto.id})" class="btn-comprar">-</button>
              <p>${producto.quantity}</p>
              <button onClick="addOne(${producto.id})" class="btn-comprar">+</button>
            </div>
            <button onClick="removeFromCart(${producto.id})" class="btn-comprar">Eliminar</button>
        </div>
      `;
      carritoGrid.innerHTML += productoHTML;
    });
  }
}

actualizarCarritoUI()

const addToCart = async (id) => {
  try {
    const response = await fetch('productos.json');
    const productos = await response.json();

    const producto = productos.find(producto => producto.id == id);

    if (!producto) {
      console.error('Producto no encontrado');
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const found = cart.find(prod => prod.id == id);
    if (found) {
      found.quantity += 1;
    } else {
      cart.push({ ...producto, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    actualizarCarritoUI();
    Toastify({
      text: "Producto agregado al carrito",
      duration: 2000,
      position: 'center',
    }).showToast();

  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
  }
}

const removeFromCart = async (id) => {
  try {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter(producto => producto.id != id);

    localStorage.setItem('cart', JSON.stringify(cart));

    actualizarCarritoUI();

  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
  }
}

const addOne = async (id) => {
  try {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const found = cart.find(prod => prod.id == id);
    if (found) {
      found.quantity += 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    actualizarCarritoUI();

  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
  }
}

const removeOne = async (id) => {
  try {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const found = cart.find(prod => prod.id == id);
    if (found && found.quantity > 1) {
      found.quantity -= 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    actualizarCarritoUI();

  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
  }
}

document.addEventListener('DOMContentLoaded', actualizarCarritoUI);

const continuarCompra = () => {
  const modal = document.querySelector('.modal');
  modal.style.display = 'flex';
}

const closeModal = () => {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
}

const finalizarCompra = (e) => {
  e.preventDefault();
  localStorage.removeItem('cart');
  closeModal();
  Toastify({
    text: "Compra finalizada",
    duration: 2000,
    position: 'center',
  }).showToast();
  actualizarCarritoUI();
}