// Defino la variable cuenta carrito para el span donde se agregan los productos
const contenedorTarjetas = document.getElementById("productos-container");
const unidadesRopa = document.getElementById("unidades");
const precioRopa = document.getElementById("precio"); 
const carritoVacio = document.getElementById("carrito-vacio");
const totalesCarrito = document.getElementById("totales");
const reiniciar = document.getElementById("reiniciar");
const comprar = document.getElementById("comprar");

// Se crean las tarjetas de los prodcutos en base a lo guardado en el localStorage
function crearTarjetasProductosInicio(){
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("ropa"));
    if(productos && productos.length > 0){
    productos.forEach(producto => {
        const nuevaRopa = document.createElement("div");
        nuevaRopa.classList = "tarjeta-producto";
        nuevaRopa.innerHTML = `
        <img src="./img/${producto.id}.png">
        <h3>${producto.nombre}</h3>
        <span>$${producto.precio}</span>
        <div>
            <button>-</button>
            <span class="cantidad">${producto.cantidad}</span>
            <button>+</button>
        </div>
        `;
        contenedorTarjetas.appendChild(nuevaRopa);
        nuevaRopa
            .getElementsByTagName("button")[1]
            .addEventListener("click",(e) => {
            const cuentaElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
            cuentaElement.innerText = agregarAlCarrito(producto);
            actualizarTotales();
            });
        nuevaRopa
            .getElementsByTagName("button")[0]
            .addEventListener("click",(e) => {
            restarAlCarrito(producto);
            crearTarjetasProductosInicio()
            actualizarTotales();
            });
        });
    }
    revisarMensajeVacio();
}

crearTarjetasProductosInicio();
actualizarTotales();


// Actualiza los totales de unidades y precio de la pagina del carrito
function actualizarTotales(){
    const productos = JSON.parse(localStorage.getItem("ropa"));
    let unidades = 0;
    let precio = 0;
    if(productos && productos.length > 0){
        productos.forEach(producto => {
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        })
        unidadesRopa.innerText = unidades;
        precioRopa.innerText = precio;
        if(precio === 0) {
            reiniciarCarrito();
            revisarMensajeVacio();
        }
    }
}

// Muestra o esconde que el carrito esta vacio
function revisarMensajeVacio(){
    const productos = JSON.parse(localStorage.getItem("ropa"));
    carritoVacio.classList.toggle("escondido", productos && productos.length >0);
    totalesCarrito.classList.toggle("escondido", !(productos && productos.length >0));
}

revisarMensajeVacio();

// Boton para reiniciar el carrito
reiniciar.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito(){
    localStorage.removeItem("ropa");
    actualizarTotales();
    crearTarjetasProductosInicio();
    Swal.fire({
        title: 'Su compra ha sido eliminada',
        icon: 'info',
        confirmButtonText: 'Aceptar'
    });

}

// Mensaje que indica que la compra se efectuo exitosamente
comprar.addEventListener("click", () =>{
    Swal.fire({
        title: 'Su compra ha sido confirmada',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
});
