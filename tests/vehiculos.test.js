const Auto = require("../modulos/Auto");
const Camion = require("../modulos/Camion");
const Moto = require("../modulos/Moto");

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