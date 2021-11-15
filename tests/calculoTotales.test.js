const Diesel = require("../modulos/Diesel");
const CentroDeControl = require("../modulos/CentroDeControl");
const generadorVehiculos = require("../modulos/GeneradorVehiculos");
const calculoTotal = require("../controladores/calculoTotal");

describe("Calculo de totales", () => {
    test("Calcular el total de un arreglo", () => {
        const cdc = new CentroDeControl();
        const diesel = Diesel();
        let arrVeiLit = [];
        arrVeiLit.push({
            tipoVehiculo: "Camion",
            capacidad: 150,
            cantCombustible: 50
        });
        arrVeiLit.push({
            tipoVehiculo: "Camion",
            capacidad: 120,
            cantCombustible: 30
        });

        let arrVei = generadorVehiculos.generarVehiculos(arrVeiLit);
        let tickets = cdc.facturarCargas(arrVei, true);
        expect(calculoTotal(tickets)).toBe(diesel.costo * 190);
    });
});