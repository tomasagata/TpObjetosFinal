const gasolinera = require("./Gasolinera");

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


    var _idOperacion = 1;
    var _ultimasDiezOperaciones = []; // Nunca TENDRIA que haber más de 10 operaciones acá


    function facturarCarga(vehiculo, flag = false, cantidadCargada) {
        var cargaEficaz;
        let ret = [];

        // Chequeo que la cantidad cargada no sea vacía, de lo contrario se considera una carga completa
        if (cantidadCargada != undefined) {
            cargaEficaz = Math.min((vehiculo.capacidad - vehiculo.cantCombustible) * vehiculo.tipoCombustible.costo, parsearCantidadCargada(cantidadCargada));
        } else {
            cargaEficaz = (vehiculo.capacidad - vehiculo.cantCombustible) * vehiculo.tipoCombustible.costo;
        }

        cargaEficaz = Math.round(cargaEficaz * 100) / 100;

        if (cargaEficaz <= vehiculo.tipoCombustible.costo * vehiculo.tipoCombustible.almacenajeActual) {

            _ultimasDiezOperaciones.push({
                idOperacion: _idOperacion,
                tipoOperacion: "Carga",
                idVehiculo: "" + vehiculo.id,
                tipoCombustible: "" + vehiculo.tipoCombustible.tipo,
                volumenCargado: "" + (vehiculo.capacidad - vehiculo.cantCombustible),
                balanceCombustibleAnterior: "" + vehiculo.tipoCombustible.almacenajeActual,
                balanceCombustibleNuevo: "" + (vehiculo.tipoCombustible.almacenajeActual - (vehiculo.capacidad - vehiculo.cantCombustible)),
                beneficio: cargaEficaz
            });

            vehiculo.tipoCombustible.almacenajeActual = vehiculo.tipoCombustible.almacenajeActual - (vehiculo.capacidad - vehiculo.cantCombustible);
        } else {

            console.log("[-] No hay suficiente combustible como para reponer al vehiculo");

            _ultimasDiezOperaciones.push({
                idOperacion: _idOperacion,
                tipoOperacion: "Carga Incompleta",
                idVehiculo: "" + vehiculo.id,
                tipoCombustible: "" + vehiculo.tipoCombustible.tipo,
                volumenCargado: "0",
                balanceCombustibleAnterior: "" + vehiculo.tipoCombustible.almacenajeActual,
                balanceCombustibleNuevo: "" + vehiculo.tipoCombustible.almacenajeActual,
                beneficio: 0
            });

        }

        if (_ultimasDiezOperaciones.length % 10 == 0 || flag) {
            ret = _ultimasDiezOperaciones;
            cierreDeCaja();
        }
        _idOperacion++;

        ret = ret.concat(chequearAprovisionamiento());

        if (vehiculo.tipoCombustible.almacenajeActual < 500 && vehiculo.tipoCombustible.progresoAprovisionamiento === -1) {
            ret = ret.concat(rellenarCombustible(vehiculo.tipoCombustible));
        }

        return ret;
    }

    function facturarCargas(arregloVehiculos, flag = false) {
        if (arregloVehiculos === undefined || arregloVehiculos.length == 0) {
            return [];
        }

        let ultimo = arregloVehiculos.pop();
        let arrRet = [];
        arregloVehiculos.forEach((v) => {
            arrRet = arrRet.concat(facturarCarga(v));
        });

        return arrRet.concat(facturarCarga(ultimo, flag));
    }


    function rellenarCombustible(tipo) {
        let ret = [];

        if (tipo === undefined) {
            throw new Error("[-] tipo de combustible indefinido");
        }

        if (tipo.progresoAprovisionamiento === -1) {

            tipo.progresoAprovisionamiento = 0;

            tipo.litrosProximoRelleno = tipo.almacenajeMax - tipo.almacenajeActual;

            _ultimasDiezOperaciones.push({
                idOperacion: _idOperacion,
                tipoOperacion: "Solicitud Restock",
                idVehiculo: "---",
                tipoCombustible: "" + tipo.tipo,
                volumenCargado: "0",
                balanceCombustibleAnterior: "" + tipo.almacenajeActual,
                balanceCombustibleNuevo: "" + tipo.almacenajeActual,
                beneficio: Math.round(-1 * tipo.costo * tipo.litrosProximoRelleno * 100) / 100,
            });

            if (_ultimasDiezOperaciones.length % 10 == 0) {
                ret = _ultimasDiezOperaciones;
                cierreDeCaja();
            }
            _idOperacion++;
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

            _ultimasDiezOperaciones.push({
                idOperacion: _idOperacion,
                tipoOperacion: "Restock",
                idVehiculo: "---",
                tipoCombustible: "" + g.tipo,
                volumenCargado: "" + g.litrosProximoRelleno,
                balanceCombustibleAnterior: "" + g.almacenajeActual,
                balanceCombustibleNuevo: "" + (g.litrosProximoRelleno + g.almacenajeActual),
                beneficio: 0
            });

            g.almacenajeActual += g.litrosProximoRelleno;
            console.log("[!] Se repuso " + g.litrosProximoRelleno + "L de combustible " + g.tipo);

            if (_ultimasDiezOperaciones.length % 10 == 0) {
                ret = ret.concat(_ultimasDiezOperaciones);
                cierreDeCaja();
            }
            _idOperacion++;
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
