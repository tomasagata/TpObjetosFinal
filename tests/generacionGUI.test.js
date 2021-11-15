const generarTabla = require("../controladores/generarTabla");
const generarBotonesNavegacion = require("../controladores/generarBotonesNavegacion");

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