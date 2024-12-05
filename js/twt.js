//de tarea como contar


//crear selectores
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = [] //Aquí es para almacenar los tweets

//eventos

eventListener()
function eventListener(){
    formulario.addEventListener('submit',agregarTweet)
    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse(localStorage.getItem
            ('tweets')) || [] 
        // SI hay algo twets y sino muestra vacío ('||') es igual a decir 'o'
        //console.log(tweets);
        crearHTML();
    })
}
/* (esta es otra forma de hacerlo, pero esta puede abarcar varias, pero como llamare una sola es mejor usar el de arriba
que es mas directo)
formulario.addEventListener('submit', (e)=>{
    e.preventDefault()
    //instrucciones
})*/


function agregarTweet(e){
    e.preventDefault()
    //console.log('boton')
    const tweet = document.querySelector('#tweet').value
    //console.log(tweets)

    if(tweet===''){
        //console.log('vacio')
        mostrarError('El tweets no puede estar vacio')
        return
        
    }else{
        const contador = tweet.length
        if(contador>250){

            sobrepasado('El tweets no puede tener mas de 250 caracteres')
            return
        }else{

        //crear un objeto
        const tweetobj = {
            tweet: tweet,
            id:Date.now()
        }
    //console.log(objTweet)
    tweets = [...tweets, tweetobj]
    sincronizarLs();//<= LLamado de función
    }
    }

    crearHTML() //no hace falta pasar el arreglo por parametro porque esta global
    //si se hace dentro de la funtion, si tendria uqe llamarse en parametro, (ABAJO)
    formulario.reset()

}
//función para guardar en el navegador
function sincronizarLs(){
   // console.log();
    localStorage.setItem('tweets',JSON.stringify(tweets))
    //De JSON a string con 'stringify' y su sintaxis es esa
}
//--------------------
function mostrarError(mensaje){
    // console.log(mensaje)
    const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje
    mensajeError.classList.add('error')

    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError)
//esto de abajo es lo que dura el mensaje de error
    setTimeout(()=>{
        mensajeError.remove()
    }, 2000)
}

//NOTAAA
//este otro de abajo es para que asi como sale el msj rojo arriba de que esta vacio
//este pueda salir un msj, sino se hace lo mismo, no saldra el msj



function sobrepasado(mensaje){
    const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje
    mensajeError.classList.add('sobrepasado')

    const contenido = document.querySelector('#textoVal')
    contenido.appendChild(mensajeError)

    setTimeout(()=>{
        mensajeError.remove()
    }, 2000)
}


function crearHTML(){ //aqui (arriba)
    limpiarHTML()
    if(tweets.length > 0){
            tweets.forEach(tweets=>{
                const li = document.createElement('li')
                const btnEliminar = document.createElement('a')
                btnEliminar.classList.add('borrar-tweet')
                btnEliminar.innerText = 'X'

                btnEliminar.onclick = ()=>{
                    borrarTweet(tweets.id)
                }

                li.innerText = tweets.tweet
                li.appendChild(btnEliminar)
                listaTweets.appendChild(li)
            })
        }
        
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}



function borrarTweet(id){
    //console.log('Ingrese a borrar')
    tweets = tweets.filter(tweets => tweets.id !== id)
    //console.log(tweets)
    sincronizarLs();//<= Al llamarla aca al eliminar también lo hace del localstrore
    crearHTML();
 }

