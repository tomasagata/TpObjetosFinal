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

// let vei = generadorVehiculos.generarVehiculo();
let cdc = new CentroDeControl();
let arrVei = generadorVehiculos.generarVehiculos(97);

cdc.facturarCargas(arrVei, true);
// console.log(vei.capacidad);
// arrVei.map(vei => console.log(`${vei.capacidad} -> ${vei.tipoCombustible}`));
//arrVei.map(vei => console.log(vei.id));

// let regular = new Regular();
// console.log(regular.id, regular.costo, regular.almacenajeMax, regular.almacenajeActual);
// regular.almacenajeActual = 1;
