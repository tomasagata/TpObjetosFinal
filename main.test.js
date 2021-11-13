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