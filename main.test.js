// Gasolinas
const Diesel = require("./modulos/Diesel");
const Premium = require("./modulos/Premium");
const Regular = require("./modulos/Regular");
// Vehiculos
const Vehiculo = require("./modulos/Vehiculo");
const Auto = require("./modulos/Auto");
const Camion = require("./modulos/Camion");
const Moto = require("./modulos/Moto");
// Centro de Control
const CentroDeControl = require("./modulos/CentroDeControl");
// Generador de Vehiculos
const generadorVehiculos = require("./modulos/GeneradorVehiculos");
// Gasolinera
const Gasolinera = require("./modulos/Gasolinera");
// Generadores de templates
const generarTabla = require("./controladores/generarTabla");
const generarBotonesNavegacion = require("./controladores/generarBotonesNavegacion");
const calculoTotal = require("./controladores/calculoTotal");

const { describe, test, expect } = require("@jest/globals");

describe("Verificación de la creacion Gasolinas", () => {

    test("Creación Regular", () => {
        const gas = Gasolinera.getGasolina("Regular");

        expect([gas.id, gas.costo, gas.almacenajeMax, gas.almacenajeActual]).toStrictEqual([0, 1, 1000, 1000]);
    });

    test("Creación Premium", () => {
        const gas = Gasolinera.getGasolina("Premium");

        expect([gas.id, gas.costo, gas.almacenajeMax, gas.almacenajeActual]).toStrictEqual([1, 2.3, 750, 750]);
    });

    test("Creación Diesel", () => {
        const gas = Gasolinera.getGasolina("Diesel");

        expect([gas.id, gas.costo, gas.almacenajeMax, gas.almacenajeActual]).toStrictEqual([2, 0.7, 2000, 2000]);
    });
});

describe("Ejemplo creación automóviles", () => {

    test("Creación Auto", () => {
        const vei = new Auto();

        expect([vei.id, vei.capacidad, vei.cantCombustible]).toStrictEqual([1, 50, 0]);
        expect(["Regular", "Premium"]).toContain(vei.tipoCombustible.tipo);
    });

    test("Creación Moto", () => {
        const vei = new Moto();

        expect([vei.id, vei.capacidad, vei.cantCombustible]).toStrictEqual([2, 10, 0]);
        expect(["Regular", "Premium"]).toContain(vei.tipoCombustible.tipo);
    });

    test("Creación Camión", () => {
        const vei = new Camion();

        expect([vei.id, vei.capacidad, vei.tipoCombustible.tipo, vei.cantCombustible]).toStrictEqual([3, 100, "Diesel", 0]);
    });
});

describe("Prueba GeneradorVehiculosRandom", () => {
    test("Creación 1 solo vehiculo al azar", () => {
        const vei = generadorVehiculos.generarVehiculoRandom();

        expect(vei).toBeInstanceOf(Vehiculo);
    });

    test("Creación 10 vehículos al azar", () => {
        const arrVei = generadorVehiculos.generarVehiculosRandom(10);

        expect(arrVei.length).toBe(10);
        arrVei.forEach(vei => {
            expect(vei).toBeInstanceOf(Vehiculo);
        });
    });
});

describe("Prueba GeneradorVehiculos", () => {
    test("Creación 1 solo vehiculo", () => {
        const vei = generadorVehiculos.generarVehiculo({
            tipoVehiculo: "Auto",
            capacidad: 145,
            cantCombustible: 23,
            tipoCombustible: "Premium"
        });

        expect(vei).toBeInstanceOf(Vehiculo);
    });

    test("Creación 2 vehículos", () => {
        let arrVeiLit = [];
        arrVeiLit.push({
            tipoVehiculo: "Camion",
            capacidad: 145,
            cantCombustible: 23,
            tipoCombustible: "Diesel"
        });
        arrVeiLit.push({
            tipoVehiculo: "Moto",
            capacidad: 145,
            cantCombustible: 23,
            tipoCombustible: "Regular"
        });

        let arrVei = generadorVehiculos.generarVehiculos(arrVeiLit);
        expect(arrVei.length).toBe(2);
        arrVei.forEach(vei => {
            expect(vei).toBeInstanceOf(Vehiculo);
        });
    });

    test("Creación 2 vehículos, uno inválido", () => {
        let arrVeiLit = [];
        arrVeiLit.push({
            tipoVehiculo: "Camion",
            capacidad: 145,
            cantCombustible: 23
        });
        arrVeiLit.push({
            tipoVehiculo: "Moto",
            capacidad: 145,
            cantCombustible: -76
        });

        let arrVei = generadorVehiculos.generarVehiculos(arrVeiLit);

        expect(arrVei.length).toBe(1);
        arrVei.forEach(vei => {
            expect(vei).toBeInstanceOf(Vehiculo);
        });
    })
});

describe("Prueba Generación de Template", () => {
    test("Creción de una tabla", () => {
        const tabla = generarTabla([]);
        expect(tabla).toMatch(/\D*(<table)\D*/gm);
        expect(tabla).toMatch(/\D*(<\/table>)\D*/gm);
    });

    test("Creción de un link", () => {
        const link = generarBotonesNavegacion({}, {});
        expect(link).toMatch(/\D*(<a)\D*/gm);
        expect(link).toMatch(/\D*(<\/a>)\D*/gm);
    });
});

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
