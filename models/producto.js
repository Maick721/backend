'use strict'
var mongoose=requiere('mongoose')
var Schema=mongoose.Schema;

var ProductSchema=Schema({
    marca:String,
    modelo:String,
    ram:String,
    rom:String,
    precio:Number,
    imagen:String
});

module.exports=mongoose.model('Producto',ProductSchema);