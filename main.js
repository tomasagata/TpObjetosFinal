// Gasolinas
const Diesel = require("./modulos/Diesel");
const Premium = require("./modulos/Premium");
const Regular = require("./modulos/Regular");
// Vehiculos
const Auto = require("./modulos/Auto");
const Camion = require("./modulos/Camion");
const Moto = require("./modulos/Moto");
// Centro de Control
const CentroDeControl = require("./modulos/CentroDeControl");
// Generador de Vehiculos
const generadorVehiculos = require("./modulos/GeneradorVehiculos");

let vei = generadorVehiculos.generarVehiculo();
let arrVei = generadorVehiculos.generarVehiculos(10);
console.log(vei.capacidad);
arrVei.map(vei => console.log(vei.capacidad));