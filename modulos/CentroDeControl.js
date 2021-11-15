const gasolinera = require("./Gasolinera");
const OperacionCarga = require("./OperacionCarga");
const OperacionCargaIncompleta = require("./OperacionCargaIncompleta");
const OperacionRestock = require("./OperacionRestock");
const OperacionSolicitudRestock = require("./OperacionSolicitudRestock");

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

    var _ultimasDiezOperaciones = []; // Nunca TENDRIA que haber más de 10 operaciones acá

    function facturarCarga(vehiculo, flag = false, cantidadCargada) {
        var cargaEficaz;
        let ret = [];
        // Chequeo que la cantidad cargada no sea vacía, de lo contrario se considera una carga completa
        if (cantidadCargada != undefined) {
            cargaEficaz = Math.min((vehiculo.capacidad - vehiculo.cantCombustible), parsearCantidadCargada(cantidadCargada)) * vehiculo.tipoCombustible.costo;
        } else {
            cargaEficaz = (vehiculo.capacidad - vehiculo.cantCombustible) * vehiculo.tipoCombustible.costo;
        }
        cargaEficaz = Math.round(cargaEficaz * 100) / 100;

        let operacionCarga = {
            vehiculo
        };

        if (cargaEficaz <= vehiculo.tipoCombustible.costo * vehiculo.tipoCombustible.almacenajeActual) {
            operacionCarga.beneficio = cargaEficaz;
            _ultimasDiezOperaciones.push(OperacionCarga(operacionCarga));
            vehiculo.tipoCombustible.almacenajeActual -= (vehiculo.capacidad - vehiculo.cantCombustible);
        } else {
            console.log("[-] No hay suficiente combustible como para reponer al vehiculo");
            operacionCarga.beneficio = 0;
            _ultimasDiezOperaciones.push(OperacionCargaIncompleta(operacionCarga));
        }

        if (_ultimasDiezOperaciones.length % 10 == 0 || flag) {
            ret = _ultimasDiezOperaciones;
            cierreDeCaja();
        }
        ret = ret.concat(chequearAprovisionamiento());
        if (vehiculo.tipoCombustible.almacenajeActual < 500 && vehiculo.tipoCombustible.progresoAprovisionamiento === -1) {
            ret = ret.concat(rellenarCombustible(vehiculo.tipoCombustible));
        }
        return ret;
    }

    function facturarCargas(arregloVehiculos, flag = false) {
        let arrRet = [];
        if (arregloVehiculos === undefined || arregloVehiculos.length == 0) {
            return arrRet;
        }

        for (var i = 0; i < arregloVehiculos.length - 1; i++) {
            arrRet = arrRet.concat(facturarCarga(arregloVehiculos[i]));
        }

        return arrRet.concat(facturarCarga(arregloVehiculos[i], flag));
    }


    function rellenarCombustible(tipo) {
        let ret = [];

        if (tipo === undefined) {
            throw new Error("[-] tipo de combustible indefinido");
        }

        if (tipo.progresoAprovisionamiento === -1) {

            tipo.progresoAprovisionamiento = 0;

            tipo.litrosProximoRelleno = tipo.almacenajeMax - tipo.almacenajeActual;

            _ultimasDiezOperaciones.push(OperacionSolicitudRestock({
                gasolina: tipo,
                beneficio: Math.round(-1 * tipo.costo * tipo.litrosProximoRelleno * 100) / 100,
            }));

            if (_ultimasDiezOperaciones.length % 10 == 0) {
                ret = _ultimasDiezOperaciones;
                cierreDeCaja();
            }
        }

        return ret;
    }


    function chequearAprovisionamiento() {
        let ret = [];

        let aux = gasolinera.gasolinas.filter((g) => {
            return g.progresoAprovisionamiento > -1;
        });

        aux.forEach((g) => {
            g.progresoAprovisionamiento++;
        });

        let aux2 = aux.filter((g) => {
            return g.progresoAprovisionamiento >= g.tiempoAprovisionamiento;
        });

        aux2.forEach((g) => {
            g.progresoAprovisionamiento = -1;

            _ultimasDiezOperaciones.push(OperacionRestock({
                gasolina: g,
                beneficio: 0
            }));

            g.almacenajeActual += g.litrosProximoRelleno;
            console.log("[!] Se repuso " + g.litrosProximoRelleno + "L de combustible " + g.tipo);

            if (_ultimasDiezOperaciones.length % 10 == 0) {
                ret = ret.concat(_ultimasDiezOperaciones);
                cierreDeCaja();
            }
        });

        return ret;
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
        facturarCargas
    }
}

module.exports = CentroDeControl;
