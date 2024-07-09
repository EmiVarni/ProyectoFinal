window.addEventListener('load', ()=> { 
    let lon
    let lat
    let temperaturaValor = document.getElementById('temperatura-valor')
    let ubicacion = document.getElementById('ubicacion')
    let iconoAnimado = document.getElementById('icono-animado')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( posicion => {
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude
            const url = `https://api.openweathermap.org/data/2.5/weather?q=Palermo,AR&lang=es&units=metric&appid=08e1e06568dcfa3b6de05144b8ee65ac`
            fetch(url)
                .then( response => { return response.json() })
                .then( data => {
                    let temp = Math.round(data.main.temp)
                    temperaturaValor.textContent = `${temp}°C`
                    ubicacion.textContent = data.name
                    // Para iconos animados
                    switch (data.weather[0].main) {
                        case 'Thunderstorm':
                            iconoAnimado.src='./img/animated/thunder.svg'
                            break;
                        case 'Drizzle':
                            iconoAnimado.src='./img/animated/rainy-2.svg'
                            break;
                        case 'Rain':
                            iconoAnimado.src='./img/animated/rainy-7.svg'
                            break;
                        case 'Snow':
                            iconoAnimado.src='./img/animated/snowy-6.svg'
                            break;                        
                        case 'Clear':
                            iconoAnimado.src='./img/animated/day.svg'
                            break;
                        case 'Atmosphere':
                            iconoAnimado.src='./img/animated/weather.svg'
                            break;  
                        case 'Clouds':
                            iconoAnimado.src='./img/animated/cloudy-day-1.svg'
                            break;  
                        default:
                            iconoAnimado.src='./img/animated/cloudy-day-1.svg'
                    }
            })
            .catch(error =>{
                console.log(error)
            })
        })
    }
})