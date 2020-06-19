// variables 
const listaTweets = document.getElementById('lista-tweets');


// event listeners 

eventListeners();

function eventListeners() {
    // cuando se envía el formulario 
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // borrar tweet 
    // agregando delegation 
    listaTweets.addEventListener('click', borrarTweet);

    // contenido cargado 
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


// funciones  

function agregarTweet(e) {
    e.preventDefault();
    console.log('formulario enviado');

    // leer el valor del text area 
    const tweet = document.getElementById('tweet').value;
    // crear boton de eliminar 
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    // crear elemento y añadir contenido a la lista 
    const li = document.createElement('li');
    li.innerText = tweet;
    // añade el boton de borrar el tweet 
    li.appendChild(botonBorrar);
    // añade el tweet a la lista 
    listaTweets.appendChild(li);

    // añadir a local storage 
    agregarTweetLocalStorage(tweet);

    console.log(tweet);
}

function borrarTweet(e) {
    e.preventDefault();

    if (e.target.className === 'borrar-tweet') {
        // console.log('diste click en eliminar');
        e.target.parentElement.remove();
        // console.log(e.target.parentElement.innerText);
        borrarTweetLocalStorage(e.target.parentElement.innerText);
        // alert('Tweet eliminado');
    }
    // else{
    //     console.log('diste click en otra parte')
    // }

    // console.log('diste click en la lista');
}

function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function (tweet) {
        // crear boton de eliminar 
        const botonBorrar       = document.createElement('a');
        botonBorrar.classList   = 'borrar-tweet';
        botonBorrar.innerText   = 'X';

        // crear elemento y añadir contenido a la lista 
        const li                = document.createElement('li');
        li.innerText            = tweet;
        // añade el boton de borrar el tweet 
        li.appendChild(botonBorrar);
        // añade el tweet a la lista 
        listaTweets.appendChild(li);
    });
}

function agregarTweetLocalStorage(tweet) {
    let tweets; 

    tweets = obtenerTweetsLocalStorage();

    // añadir el nuevo tweet 
    tweets.push(tweet);

    // agregar a local storage 
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// comprobar que haya elementos en local storage 
function obtenerTweetsLocalStorage() {
    let tweets;

    // revisamos los valores de local storage 
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    }
    else{
        tweets = JSON.parse( localStorage.getItem('tweets') );
    }
    return tweets;
}

function borrarTweetLocalStorage(param) {
    let tweets, tweetBorrar;
    // console.log(param);

    tweetBorrar = param.substring(0, param.length - 1);
    
    tweets      = obtenerTweetsLocalStorage(); 
    // console.log(tweetBorrar);
    tweets.forEach(function (tweet, index) {
        // console.log(tweet);
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
    // console.log(tweets);
}