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
const { describe, test, expect } = require("@jest/globals");

describe("Ejemplo creacion Gasolinas", () => {

    test("Creación Regular", () => {
        const gas = new Regular();

        expect([gas.id, gas.costo, gas.almacenajeMax, gas.almacenajeActual]).toStrictEqual([1, 1, 1000, 1000]);
    });

    test("Creación Premium", () => {
        const gas = new Premium();

        expect([gas.id, gas.costo, gas.almacenajeMax, gas.almacenajeActual]).toStrictEqual([2, 2.3, 750, 750]);
    });

    test("Creación Diesel", () => {
        const gas = new Diesel();

        expect([gas.id, gas.costo, gas.almacenajeMax, gas.almacenajeActual]).toStrictEqual([3, 0.7, 2000, 2000]);
    });
});

describe("Ejemplo creación automóviles", () => {

    test("Creación Auto", () => {
        const vei = new Auto();

        expect([vei.capacidad, vei.cantCombustible]).toStrictEqual([50, 0]);
        expect(["Regular", "Premium"]).toContain(vei.tipoCombustible);
    });

    test("Creación Moto", () => {
        const vei = new Moto();

        expect([vei.capacidad, vei.cantCombustible]).toStrictEqual([10, 0]);
        expect(["Regular", "Premium"]).toContain(vei.tipoCombustible);
    });

    test("Creación Camión", () => {
        const vei = new Camion();

        expect([vei.capacidad, vei.tipoCombustible, vei.cantCombustible]).toStrictEqual([100, "Diesel", 0]);
    });
});

describe("Prueba GeneradorVehiculos", () => {
    test("Creación 1 solo vehiculo", () => {
        const vei = generadorVehiculos.generarVehiculo();

        expect(vei).toBeInstanceOf(Vehiculo);
    });

    test("Creación 10 vehículos", () => {
        const arrVei = generadorVehiculos.generarVehiculos(10);

        expect(arrVei.length).toBe(10);
        arrVei.forEach(vei => {
            expect(vei).toBeInstanceOf(Vehiculo);
        });
    });
});