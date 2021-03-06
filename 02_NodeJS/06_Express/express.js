//npm install express
const express = require('express')



//Cuando invocamos la funcion express nos devueven un objeto del tipo función
//Esa es la función que procesará todas las peticiones entrantes
let app = express()

//El objeto 'app' es la función que se le proporciona al servidor cuando se invoca 'createServer'
//const http = require('http')
//http.createServer( app )
//    .listen(4000, function(){ 
//        console.log("Esperando peticiones en el puerto 4000.") 
//    })


//
//Indicando el puerto y arrancando el servidor:
//

//Dentro de la función listen está el siguiente código:
//http.createServer( function )
//    .listen(4000, callback) 
//})
app.listen(5000, function(){
    console.log("Esperando peticiones en el puerto 5000")
})

//////////////////////////
// CONFIGURANDO EXPRESS //
//////////////////////////

//URLS y METODOS:
app.get('/saludo', saludar)
app.post('/insertar', insertar)

//Las funciones que asignamos a los distintos pares METODO+URL 
//recibirán el request y el response como parámetro
function saludar(request, response){
    response.end("Hola que tal")
}

function insertar(request, response){
    response.end("Recurso insertado")
}

//Podemos definir el callback en la propia llamada a get, post, put...
//Pero QUEDA FEISIMO!
app.get('/pagina', function(request, response){
    let html = `
        <html>
            <body>
                <marquee>
                    Html generado dinamicamente con Node.JS + Express
                </marquee>
            </body>
        </html>`;
    response.setHeader('Content-type', 'text/html')
    response.end(html)
})

//
//Accediendo a los query params (?)
//

//Los query params NO se indican en la url
app.get("/peliculas", listarPeliculas)

function listarPeliculas(request, response){
    //Express añade al request una propiedad llamada 'query' en la que estarán los parámetros
    //query es un objeto y sus propiedades son los parámetros
    console.log("Listando las películas. Parámetros recibidos:")
    console.log("Genero:"+request.query.genero)
    console.log("Año:"+request.query.year)
    response.end("Listado con las peliculas...")
}

//
// Accediendo a parámetros que vienen en la URL
//

//Las partes variables en la url las indicaremos con ':'
//Express se monta sus expresiones regulares para saber si la url coincide o no
//GET /peliculas/5
//GET /peliculas/25
app.get("/peliculas/:id", buscarPeliculaPorId)

function buscarPeliculaPorId(request, response){
    //Express añade al request una propiedad llamada 'params'
    //En ella hay un objeto cuyas propiedades son los parámetros incluidos en la URL
    let id = request.params.id
    response.end("Datos de la película "+id+": bla bla blá")
}

//Podemos indicar más de un parámetro en la url
//GET /movida/123/tocoto/abc
//GET /movida/abc/tocoto/123
app.get("/movida/:dato1/tocoto/:dato2", procesarMovida)

function procesarMovida(request, response){
    console.log("Procesando una movida gordísma con los datos: "+request.params.dato1+" y "+request.params.dato2)
    response.end()
}

//
//Devolviendo un JSON
//
// ...



//
//Accediendo al body
//

//Si queremos que express lea el body debemos añadirle un objeto capaz de procesarlo
//Esos objetos se llaman 'bodyParsers'
//De serie vienen cuatro:
//JSON bodyParser: 
//      Lee del body un JSON y lo transforma en objetos JS
//      Accedemos a él con request.body
//Url encoded form body parser:
//      Se usa cuando esperamos parámetros dentro del body.
//      Luego accederemos a ellos con request.query
//Text body parser:
//      El más sencillo de todos. Lee el body y lo deja tal cual, como una cadena 
//      de texto en request.body
//
//Se puede indicar más de un bodyParser y express usará el que corresponda dependiendo
//del Content-type de la petición

//Tenemos que hacer el require. Este módulo está ya incluido en express, no hace falta descargarlo con NPM
const bodyParser = require("body-parser")

//Añadimos los bodyParsers necesarios.
//Si no añadimos un body parser express no leerá el body
app.use(bodyParser.json())

app.put("/personajes/:id", modificarPersonaje)

function modificarPersonaje(request, response){

    //Express lee el body por nosotros y lo deja en el request
    //como valor de la propiedad 'body'

    //Como hemos añadido el 'json body parser' el contenido de la propiedad 'bodi' no es un string
    //con el JSON, ya han hecho JSON.parse por nosotros
    console.log("Body:"+request.body)

    let personaje = request.body
    console.log("Body:"+personaje.nombre)

    response.end("Modificado")
}

//
//Sirviendo contenido estático
//

//De momento hemos definido estas peticiones:
//app.get('/saludo', saludar)
//app.post('/insertar', insertar)
//app.get('/pagina', function(request, response){ ... })
//app.get("/peliculas", listarPeliculas)
//app.get("/peliculas/:id", buscarPeliculaPorId)
//app.get("/movida/:dato1/tocoto/:dato2", procesarMovida)
//app.put("/personajes/:id", modificarPersonaje)

//Cuando llega una peticion express compara el método y la url con las
//distintas peticiones que hemos definido si no coincide con ninguna de ellas
//Hace un último intento dentro de la carpeta 'recuros'

//Si no lo encuentra ya se devuelve un 404

app.use(express.static("./recursos"))

//
//Definiendo el 'HOME'
//
app.get("/", home)
function home(request, response){
    response.end("PAGINA DE INCIO")
}

//Quitando la 'publicidad'
//Express añade por defecto a todas las respuestas el header 'X-Powered-By: Express'
//Cuantas menos indicaciones demos a posibles atacantes MEJOR
app.disable('x-powered-by')




