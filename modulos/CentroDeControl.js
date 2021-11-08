const Diesel = require("./Diesel");
const Regular = require("./Regular");
const Premium = require("./Premium");

function CentroDeControl() {

    // Utilizo patrón Singleton, puesto que debe haber solo un facturador 
    // para que no mezclen los ids de facturación.

    if (CentroDeControl.instancia != undefined) {
        return CentroDeControl.instancia;
    }

    if (!(this instanceof CentroDeControl)) {
        CentroDeControl.instancia = new CentroDeControl();
        return CentroDeControl.instancia;
    }

    var _reservas = {
        Diesel: new Diesel(),
        Regular: new Regular(),
        Premium: new Premium(),
    };
    var _idOperacion = 1;
    var _ultimasDiezOperaciones = [];

    function facturarCarga(vehiculo, cantidadCargada) {
        var cargaEficaz;

        if (cantidadCargada != undefined) {
            cargaEficaz = Math.min((vehiculo.capacidad - vehiculo.cantCombustible) * _reservas[vehiculo.tipoCombustible].costo, parsearCantidadCargada(cantidadCargada));
        } else {
            cargaEficaz = (vehiculo.capacidad - vehiculo.cantCombustible) * _reservas[vehiculo.tipoCombustible].costo;
        }

        _ultimasDiezOperaciones.push({
            idOperacion: "" + _idOperacion,
            tipoOperacion: "carga",
            idVehiculo: "" + vehiculo.id,
            tipoCombustible: vehiculo.tipoCombustible,
            volumenCargado: "" + (vehiculo.capacidad - vehiculo.cantCombustible),
            balanceCombustibleAnterior: "" + _reservas[tipo].almacenajeActual,
            balanceCombustibleNuevo: "" + (_reservas[tipo].almacenajeActual - (vehiculo.capacidad - vehiculo.cantCombustible)),
            beneficio: cargaEficaz
        });

        _reservas[tipo].almacenajeActual = _reservas[tipo].almacenajeActual - (vehiculo.capacidad - vehiculo.cantCombustible);

        if (_idOperacion % 10 == 0) {
            cierreDeCaja();
        }
        _idOperacion++;
    }

    function rellenarCombustible(tipo) {
        if (tipo === undefined) {
            throw new Error("[-] tipo de combustible indefinido");
        }

        volumenACargar = _reservas[tipo].almacenajeMax - _reservas[tipo].almacenajeActual;

        _ultimasDiezOperaciones.push({
            idOperacion: "" + _idOperacion,
            tipoOperacion: "Restock",
            idVehiculo: "---",
            tipoCombustible: "" + tipo,
            volumenCargado: "" + volumenACargar,
            balanceCombustibleAnterior: "" + _reservas[tipo].almacenajeActual,
            balanceCombustibleNuevo: "" + _reservas[tipo].almacenajeMax,
            beneficio: -1 * _reservas[tipo].costo * volumenACargar,
        });

        _reservas[tipo].almacenajeActual = _reservas[tipo].almacenajeMax;
        console.log("[!] Repuesto " + volumenACargar + "L de combustible " + tipo);

        if (_idOperacion % 10 == 0) {
            cierreDeCaja();
        }
        _idOperacion++;
    }

    function cierreDeCaja() {
        let sumaBeneficios = 0;

        _ultimasDiezOperaciones.forEach((elem) => {
            sumaBeneficios = sumaBeneficios + elem.beneficio;
        });

        console.table(_ultimasDiezOperaciones);
        console.log("\nBeneficio final: " + sumaBeneficios);

        _ultimasDiezOperaciones = [];
    }

    function parsearCantidadCargada(cantidad) {
        // La cantidad tiene que ser un número para representar la cantidad de plata a cargar o "Lleno"

        if (cantidad.match(/^[1-9]([0-9]*)$/)) {
            return parseInt(cantidad);
        } else {
            throw new Error("[-] Cantidad a cargar inválida.");
        }

    }

    return {
        facturarCarga,
        rellenarCombustible
    }
}

module.exports = CentroDeControl;
