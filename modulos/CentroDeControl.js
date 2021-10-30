function CentroDeControl() {

    if (CentroDeControl.instancia != undefined) {
        return CentroDeControl.instancia;
    }

    if (!(this instanceof CentroDeControl)) {
        CentroDeControl.instancia = new CentroDeControl();
        return CentroDeControl.instancia;
    }

    var _idOperacion = 1;
    var _ultimasDiezOperaciones = [];

    function facturar(vehiculo) {

        // ...

        // if _idOperacion % 10 == 0: cierreDeCaja()
        // _idOperacion++
    }

    function cierreDeCaja() {
        // ...

        // vaciar _ultimasDiezOperaciones
    }

    return {
        facturar: facturar
    }
}

module.exports = CentroDeControl;