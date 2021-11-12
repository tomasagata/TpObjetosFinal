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
    var _ultimasDiezOperaciones = []; // Nunca tiene que haber más de 10 operaciones acá


    function facturarCarga(vehiculo, flag = false, cantidadCargada) {
        var cargaEficaz;
        let ret1 = undefined;
        let ret2 = [];

        // Chequeo que la cantidad cargada no sea vacía, de lo contrario se considera una carga completa
        if (cantidadCargada != undefined) {
            cargaEficaz = Math.min((vehiculo.capacidad - vehiculo.cantCombustible) * vehiculo.tipoCombustible.costo, parsearCantidadCargada(cantidadCargada));
        } else {
            cargaEficaz = (vehiculo.capacidad - vehiculo.cantCombustible) * vehiculo.tipoCombustible.costo;
        }

        cargaEficaz = Math.round(cargaEficaz * 100) / 100;

        _ultimasDiezOperaciones.push({
            idOperacion: _idOperacion,
            tipoOperacion: "carga",
            idVehiculo: "" + vehiculo.id,
            tipoCombustible: "" + vehiculo.tipoCombustible.tipo,
            volumenCargado: "" + (vehiculo.capacidad - vehiculo.cantCombustible),
            balanceCombustibleAnterior: "" + vehiculo.tipoCombustible.almacenajeActual,
            balanceCombustibleNuevo: "" + (vehiculo.tipoCombustible.almacenajeActual - (vehiculo.capacidad - vehiculo.cantCombustible)),
            beneficio: cargaEficaz
        });

        vehiculo.tipoCombustible.almacenajeActual = vehiculo.tipoCombustible.almacenajeActual - (vehiculo.capacidad - vehiculo.cantCombustible);

        if (_ultimasDiezOperaciones.length % 10 == 0 || flag) {
            ret1 = _ultimasDiezOperaciones;
            cierreDeCaja();
        }
        _idOperacion++;

        if (vehiculo.tipoCombustible.almacenajeActual < 500) {
            ret2 = rellenarCombustible(vehiculo.tipoCombustible);
        }

        return ret1 ? ret1 : ret2;
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

        volumenACargar = tipo.almacenajeMax - tipo.almacenajeActual;

        _ultimasDiezOperaciones.push({
            idOperacion: _idOperacion,
            tipoOperacion: "Restock",
            idVehiculo: "---",
            tipoCombustible: "" + tipo.tipo,
            volumenCargado: "" + volumenACargar,
            balanceCombustibleAnterior: "" + tipo.almacenajeActual,
            balanceCombustibleNuevo: "" + tipo.almacenajeMax,
            beneficio: Math.round(-1 * tipo.costo * volumenACargar * 100) / 100,
        });

        tipo.almacenajeActual = tipo.almacenajeMax;
        console.log("[!] Se repuso " + volumenACargar + "L de combustible " + tipo.tipo);

        if (_ultimasDiezOperaciones.length % 10 == 0) {
            ret = _ultimasDiezOperaciones;
            cierreDeCaja();
        }
        _idOperacion++;

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
