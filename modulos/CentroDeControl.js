const gasolinera = require("./Gasolinera");
const OperacionCarga = require("./OperacionCarga");
const OperacionCargaIncompleta = require("./OperacionCargaIncompleta");
const OperacionRestock = require("./OperacionRestock");
const OperacionSolicitudRestock = require("./OperacionSolicitudRestock");

/*
CentroDeControl es el objeto Unico por donde se realizan todas las facturaciones, recargas y cierres de caja.
Esta 100% automatizado, de manera tal que solo se tiene que centrar en facturar a los vehiculos, y los cierres
de caja se harán automáticamente.

Refactorizaciones:
    - Se utiliza el patrón Singleton para generar una única instancia de CentroDeControl
    - En vez de llamar a rellenarCombustible manualmente por cada carga, se hace automáticamente cuando la cantidad de combustible decae a <500
    - Agregado el flag para que facturarCarga retorne a pedido las ultimas facturaciones
    - Optimizacion del uso de dependencias
*/

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

    /*
    Metodo principal de facturación. Realiza checkout cada 10 vehiculos o a voluntad si se le agrega
    el flag = true
    */

    function facturarCarga(vehiculo, flag = false, cantidadCargada) {
        var cargaEficaz;
        let retorno = [];
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
            retorno = _ultimasDiezOperaciones;
            cierreDeCaja();
        }
        retorno = retorno.concat(chequearAprovisionamiento());
        if (vehiculo.tipoCombustible.almacenajeActual < 500 && vehiculo.tipoCombustible.progresoAprovisionamiento === -1) {
            retorno = retorno.concat(rellenarCombustible(vehiculo.tipoCombustible));
        }
        return retorno;
    }

    function facturarCargas(arregloVehiculos, flag = false) {
        let arrRetorno = [];
        if (arregloVehiculos === undefined || arregloVehiculos.length === 0) {
            return arrRetorno;
        }

        for (var i = 0; i < arregloVehiculos.length - 1; i++) {
            arrRetorno = arrRetorno.concat(facturarCarga(arregloVehiculos[i]));
        }

        return arrRetorno.concat(facturarCarga(arregloVehiculos[i], flag));
    }


    function rellenarCombustible(tipo) {
        let retorno = [];

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
                retorno = _ultimasDiezOperaciones;
                cierreDeCaja();
            }
        }

        return retorno;
    }


    function chequearAprovisionamiento() {
        let retorno = [];

        let aux = gasolinera.gasolinas.filter((gasolina) => {
            return gasolina.progresoAprovisionamiento > -1;
        });

        aux.forEach((gasolina) => {
            gasolina.progresoAprovisionamiento++;
        });

        let aux2 = aux.filter((gasolina) => {
            return gasolina.progresoAprovisionamiento >= gasolina.tiempoAprovisionamiento;
        });

        aux2.forEach((gasolina) => {
            gasolina.progresoAprovisionamiento = -1;

            _ultimasDiezOperaciones.push(OperacionRestock({
                gasolina,
                beneficio: 0
            }));

            gasolina.almacenajeActual += gasolina.litrosProximoRelleno;
            console.log("[!] Se repuso " + gasolina.litrosProximoRelleno + "L de combustible " + gasolina.tipo);

            if (_ultimasDiezOperaciones.length % 10 == 0) {
                retorno = retorno.concat(_ultimasDiezOperaciones);
                cierreDeCaja();
            }
        });

        return retorno;
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
