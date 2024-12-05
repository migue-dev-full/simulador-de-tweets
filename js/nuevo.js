//Creando selectores
const formulario = document.getElementById('formulario');
const listaTweets = document.getElementById('lista-tweets');
//
const limite = 250;


//Funcion para crear mensajes o notificaciones
function notificaciones(texto){
   const notificacion = document.getElementById('textoVal');
   var mensaje = document.createElement('span');
   mensaje.textContent = texto;
   mensaje.classList.add('error');

   notificacion.appendChild(mensaje);

   setTimeout(function(){
    mensaje.remove();
    //setTimeout para determinar cada cuanto se ejecuta una funcion


   }, 3000)



}


function agregarTweet(event) {
    event.preventDefault();
    const tweet = document.getElementById('tweet');

    if(tweet.value != ''){
        if( tweet.value.length <= limite ) {
            listaTweets.innerHTML += `
            <div>
            ${tweet.value}
            </div>
            `;
            // se usa += para tomar el valor del html y agregarle o sumarle el valor extra.
            // otra opcion con el innehtml es hacerlo usando las doble comillas ex: 
            //listaTweets.innerHTML += "<div>" + tweet + "</div>"
            tweet.value = '';
            //para limpiar un input debemos usar el value con ua cadena de caracteres vacia.
            

        } else {
            //\
            notificaciones('El tweet no puede tener mas de ' + limite + " caracteres");
    
        }
    }else{
        //\

        notificaciones('El tweet no puede estar vacio.');

    }

}

formulario.addEventListener('submit', agregarTweet)
