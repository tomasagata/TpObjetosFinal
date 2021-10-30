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
const GeneradorVehiculos = require("./modulos/GeneradorVehiculos");

let gen = new GeneradorVehiculos();
let vei = gen.generarVehiculo();
let arrVei = gen.generarVehiculos(10);
console.log(vei.capacidad);
arrVei.map(vei => console.log(vei.capacidad));