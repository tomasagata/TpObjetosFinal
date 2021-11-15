const generadorVehiculos = require("../modulos/GeneradorVehiculos");
const Vehiculo = require("../modulos/Vehiculo");

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