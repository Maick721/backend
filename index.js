//codigo mas seguro y robusto
"use strict"
var mongoose = require('mongoose');
var port ='3600';
//promesas nativas de javascript
mongoose.promise=global.Promise;
// importacion de tu aplicacion express
var app = require('./app');
//conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/tienda')
.then(()=>{
    console.log("La conexion etablecida con la bdd");
    app.listen(port,()=>{
        console.log("Conexion establecida en el url : localhot: 3600");
    })
})
.catch(err=>console.log(err));
