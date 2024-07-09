// Defino la variable cuenta carrito para el span donde se agregan los productos
const cuentaCarrito = document.getElementById("cuenta-carrito");

// Busca el producto con al menos un ID y lo agrega al carrito
function agregarAlCarrito(producto){
    // Comprueba si el producto esta en el carrito
    let memoria = JSON.parse(localStorage.getItem("ropa")) || [];
    let cuenta = 0;
    // Si no hay localStorage lo crea
    if(!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("ropa", JSON.stringify([nuevoProducto]));
        cuenta = 1;
    } else{
        // Si hay localStorage comprueba que el producto ya esta ahi
        const indiceProducto = memoria.findIndex(ropa => ropa.id === producto.id);
        const nuevaMemoria = memoria;
        if(indiceProducto === -1){
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
            cuenta = 1;
        } else{
            // Si el producto esta en el carrito se agrega 1 a la cantidad
            nuevaMemoria[indiceProducto].cantidad ++;
            cuenta = nuevaMemoria[indiceProducto].cantidad;
        }
        localStorage.setItem("ropa", JSON.stringify(nuevaMemoria));
    }
    actualizarNumeroCarrito();
    Swal.fire({
        title: '¡Producto agregado!',
        text: `${producto.nombre} se agrego al carrito. Cantidad: ${cuenta}`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
    return cuenta;
}

// Definicion del array de productos (ropa)
const ropa = [
    {id: 1, nombre: "buzo hoodie grey", precio: 50000, img:"1.png"},
    {id: 2, nombre: "buzo hoodie two sides", precio: 75000},
    {id: 3, nombre: "buzo street green", precio: 65000},
    {id: 4, nombre: "buzo over grey", precio: 50000},
    {id: 5, nombre: "sweater total brown", precio: 120000},
    {id: 6, nombre: "sweater total light grey", precio: 150000}
];

// Resta una unidad de un producto del carrito
function restarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("ropa"));
    const indiceProducto = memoria.findIndex(ropa => ropa.id === producto.id);
    let cuenta = 0;
    if(memoria[indiceProducto].cantidad === 1){
        memoria.splice(indiceProducto, 1);
        Swal.fire({
            title: '¡Producto eliminado!',
            text: `${producto.nombre} elimino del carrito. Cantidad: ${cuenta}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    } else {
        memoria[indiceProducto].cantidad--;
        cuenta = memoria[indiceProducto].cantidad;
        Swal.fire({
            title: '¡Producto eliminado!',
            text: `${producto.nombre} elimino del carrito. Cantidad: ${cuenta}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }
    localStorage.setItem("ropa", JSON.stringify(memoria));
    actualizarNumeroCarrito();
}

// Agrega cantidad a un producto del carrito
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

// Cambia el numero del carrito en el icono del header
function actualizarNumeroCarrito(){
    const memoria = JSON.parse(localStorage.getItem("ropa")); 
    if(memoria && memoria.length >0){
    const cuenta = memoria.reduce((acumulador, numero) => acumulador + numero.cantidad, 0);
    cuentaCarrito.innerText = cuenta;
    } else{
        cuentaCarrito.innerText = 0;
    }
}

actualizarNumeroCarrito();