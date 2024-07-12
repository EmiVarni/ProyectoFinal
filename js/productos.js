const contenedorTarjetas = document.getElementById("productos-container");
const popUp = document.querySelector('#popup-mensaje');


// Creo las tarjetas de los productos
function crearTarjetasProductosInicio(productos){
    productos.forEach(producto => {
        const nuevaRopa = document.createElement("div");
        nuevaRopa.classList = "tarjeta-producto";
        nuevaRopa.innerHTML = `
        <img src="./img/${producto.id}.png" class="img-producto">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button>Agregar al carrito</button>
        `;
        contenedorTarjetas.appendChild(nuevaRopa);
        nuevaRopa.getElementsByTagName("button")[0].addEventListener("click",() => {agregarAlCarrito(producto)
        });
        
        // Añadir evento click a la imagen del producto
        const imgProd = nuevaRopa.querySelector('.img-producto');
        imgProd.addEventListener('click',() =>{
            Swal.fire({
                title: 'Con tu compra mayor a $250.000 el envío es gratis!!!',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            });
            setTimeout(()=>{
                Swal.close()
            },1000)
        })
    });
}

crearTarjetasProductosInicio(ropa);

const peticionML = async () => {
    const respuesta = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=buzo%20hombre%20gris%20cuelloredondo');
    const datos = await respuesta.json();
    const productos = datos.results.map(item => ({
        id: item.id,
        nombre: `${item.title}`, 
        title:`${item.title}`,
        precio: `${item.price}`,
        price: `${item.price}`, 
        imagen: `${item.thumbnail}`
    }));
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList = "tarjeta-producto";
        card.innerHTML = `
            <img class="img-producto" src="${producto.imagen}.png" alt="${producto.title}" />
            <h3>${producto.title}</h3>
            <p>$${producto.price}</p>
            <button>Agregar al carrito</button>
        `;
        contenedorTarjetas.appendChild(card);
        card.getElementsByTagName("button")[0].addEventListener("click", () => { agregarAlCarrito(producto) });    
        const imgProd = card.querySelector('.img-producto');
        imgProd.addEventListener('click', () => {
            Swal.fire({
                title: 'Con tu compra mayor a $250.000 el envío es gratis!!!',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            });
            setTimeout(() => {
                Swal.close();
            }, 1000);
        });
    });
};

peticionML();



