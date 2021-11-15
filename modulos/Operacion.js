// Generador de IDs
const generadorId = (() => {
    let id = 0;

    const incrementarId = () => {
        id++;
    }

    const genId = () => {
        incrementarId();
        return id;
    }

    return {
        genId
    }
})();

function Operacion(beneficioObtenido) {
    if (!(this instanceof Operacion)) {
        return new Operacion(beneficioObtenido);
    }

    var _idOperacion = generadorId.genId();
    var _beneficio = beneficioObtenido;

    // SETTERs y GETTERs
    Object.defineProperty(this, "idOperacion", {
        get() {
            return _idOperacion;
        },
        enumerable: true
    });

    Object.defineProperty(this, "beneficio", {
        get() {
            return _beneficio;
        },
        enumerable: true
    });
}

module.exports = Operacion;