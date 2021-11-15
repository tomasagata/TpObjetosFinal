const Gasolinera = require("../modulos/Gasolinera");

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