// LLAMADOS Y VARIABLES
const tienda = document.getElementById('tienda-productos')
const cart = document.getElementById("carrito")
const vaciar = document.getElementById("modalVaciar")
const botonCompra = document.getElementById("finalizarCompra")

let productos = []

let carrito = []

// FETCH

const cargar = async () => {
    const resp = await fetch('./stock.json')
    const data = await resp.json()

    productos = data
    mostrarTienda(productos)
}

cargar()

// TIENDA

function mostrarTienda(array) {
    array.forEach((prod) => {
        const div = document.createElement("div")
        div.classList.add ("card", "col-xxl-3", "col-xl-4", "col-lg-6", "col-md-12", "position-static")

        div.innerHTML=`
        <div class="card-body text-center">
            <img src=${prod.img} class="card-img-top img-fluid" alt="Producto ${prod.id}">
            <h3 class="card-title">${prod.nombre}</h3>
            <p class="card-text">Precio: $${prod.precio}</p>
            <p class="card-text">Talle: ${prod.talle}</p>
            <button id="agregar${prod.id}" class="btn btn-dark">Agregar al carrito <i class="bi bi-cart-plus"></i></button>
        </div>
        `
        tienda.append(div)

        $(`#agregar${prod.id}`).on('click', () => {
            agregarAlCarrito(prod.id)
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: 'success',
                title: 'Tu producto ha sido agregar al carrito!',
                timer: 1100,
                showConfirmButton: false,
            })
        })
    })
} 

// FUNCION AGREGAR AL CARRITO

const agregarAlCarrito = (prodId) => {
    const item = productos.find( (prod) => prod.id === prodId)
    carrito.push(item)
    
    actualizar()
}

// FUNCION ELIMINAR ITEM DEL CARRITO

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find( (prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    
    actualizar()
}

// FUNCION ACTUALIZAR EL CARRITO

const actualizar = () => {

    cart.innerHTML = ""

    carrito.forEach (producto => {
        const div = document.createElement("div")

        div.innerHTML = `
            <div class = "d-flex justify-content-around align-items-center py-3">
                <h5 class="m-0">${producto.nombre}</h5>
                <p class="m-0">Precio: $${producto.precio}</p>
                <p class="m-0">Talle: ${producto.talle}</p>
                <button onclick="eliminarDelCarrito(${producto.id})" type="button" class="btn btn-dark"><i class="bi bi-trash"></i></button>
            </div>
            `

        cart.appendChild(div)
    })

    contadorCarrito.innerText = carrito.length
    valorTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}

// VACIAR CARRITO

const vaciarCarrito = () => {
    carrito = []
    actualizar()
}

vaciar.addEventListener ("click", () => {
    vaciarCarrito()
})

// FINALIZAR COMPRA

botonCompra.addEventListener("click", () => {
    if (carrito.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'El carrito esta vacío',
            timer: 1200,
            showConfirmButton: false,
        })
    }
    else {
        Swal.fire({
            icon: 'success',
            title: 'Tu compra ha sido realizada con exito!',
            timer: 1200,
            showConfirmButton: false,
        })
        vaciarCarrito()
    }
})
