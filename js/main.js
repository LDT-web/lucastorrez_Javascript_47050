// PRODUCTOS
const productos = [
  // Zapatillas
  {
    id: "zapatilla-01",
    titulo: "zapatilla 01",
    imagen: "./img/zapatillas/01.jpg",
    categoria: {
      nombre: "zapatillas",
      id: "zapatillas",
    },
    precio: 1000,
  },
  {
    id: "zapatilla-02",
    titulo: "zapatilla 02",
    imagen: "./img/zapatillas/02.jpg",
    categoria: {
      nombre: "zapatillas",
      id: "zapatillas",
    },
    precio: 1000,
  },
  {
    id: "zapatilla-03",
    titulo: "zapatilla 03",
    imagen: "./img/zapatillas/03.jpg",
    categoria: {
      nombre: "zapatillas",
      id: "zapatillas",
    },
    precio: 1000,
  },
  {
    id: "zapatilla-04",
    titulo: "zapatilla 04",
    imagen: "./img/zapatillas/04.jpg",
    categoria: {
      nombre: "zapatillas",
      id: "zapatillas",
    },
    precio: 1000,
  },
  // remeras
  {
    id: "remera-01",
    titulo: "remera 01",
    imagen: "./img/remeras/01.jpg",
    categoria: {
      nombre: "remeras",
      id: "remeras",
    },
    precio: 1000,
  },
  {
    id: "remera-02",
    titulo: "remera 02",
    imagen: "./img/remeras/02.jpg",
    categoria: {
      nombre: "remeras",
      id: "remeras",
    },
    precio: 1000,
  },
  {
    id: "remeras-03",
    titulo: "remeras 03",
    imagen: "./img/remeras/03.jpg",
    categoria: {
      nombre: "remeras",
      id: "remeras",
    },
    precio: 1000,
  },
  {
    id: "remera-04",
    titulo: "remera 04",
    imagen: "./img/remeras/04.jpg",
    categoria: {
      nombre: "remeras",
      id: "remeras",
    },
    precio: 1000,
  },
  {
    id: "remera-05",
    titulo: "remera 05",
    imagen: "./img/remeras/05.jpg",
    categoria: {
      nombre: "remeras",
      id: "remeras",
    },
    precio: 1000,
  },
  {
    id: "remera-06",
    titulo: "remera 06",
    imagen: "./img/remeras/06.jpg",
    categoria: {
      nombre: "remeras",
      id: "remeras",
    },
    precio: 1000,
  },
  {
    id: "remera-07",
    titulo: "remera 07",
    imagen: "./img/remeras/07.jpg",
    categoria: {
      nombre: "remeras",
      id: "remeras",
    },
    precio: 1000,
  },

  // Pantalones
  {
    id: "pantalon-01",
    titulo: "Pantalón 01",
    imagen: "./img/pantalones/01.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 1000,
  },
  {
    id: "pantalon-02",
    titulo: "Pantalón 02",
    imagen: "./img/pantalones/02.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 1000,
  },
  {
    id: "pantalon-03",
    titulo: "Pantalón 03",
    imagen: "./img/pantalones/03.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 1000,
  },
  {
    id: "pantalon-04",
    titulo: "Pantalón 04",
    imagen: "./img/pantalones/04.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 1000,
  },
  {
    id: "pantalon-05",
    titulo: "Pantalón 05",
    imagen: "./img/pantalones/05.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 1000,
  },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";

  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

    contenedorProductos.append(div);
  });

  actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const productoCategoria = productos.find(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      tituloPrincipal.innerText = productoCategoria.categoria.nombre;
      const productosBoton = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito();
} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );

  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }

  actualizarNumerito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numerito.innerText = nuevoNumerito;
}
