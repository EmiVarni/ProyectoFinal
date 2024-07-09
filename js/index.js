// Definicion de variables
const galleryContainer = document.querySelector('.filmina');
const prev = document.querySelector('.control.icon-prev');
const next = document.querySelector('.control.icon-next');

const imagenes = ['carru1', 'carru2', 'carru3'];
let currentIndex = 0;

// Función que genera los elementos en la galeria
function createGallery() {
    imagenes.forEach((carru1, index) => {
        const li = document.createElement('li');
        const image = document.createElement('img');
        image.src = `img/${carru1}.png`;
        image.alt = `img ${index + 1}`;
        li.appendChild(image);
        if (index === 0) {
            li.classList.add('active');
        }
        galleryContainer.appendChild(li);
    });
}

// Función que muestra cada imagen en el índice correspondiente
function showImage(index) {
    const galleryItems = document.querySelectorAll('.filmina li');
    galleryItems.forEach((li, i) => {
        li.classList.toggle('active', i === index);
    });
}

// Función que muestra la imagen siguiente
function showNextImage() {
    currentIndex = (currentIndex + 1) % imagenes.length;
    showImage(currentIndex);
}

// Función que muestra la imagen anterior
function showPrevImage() {
    currentIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
    showImage(currentIndex);
}

// Eventos en botones para pasar o retroceder de imagen
next.addEventListener('click', showNextImage);
prev.addEventListener('click', showPrevImage);

// Inicio de la galeria
createGallery();
showImage(currentIndex);