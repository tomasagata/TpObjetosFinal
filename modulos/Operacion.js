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

/*
    Reffactor:
        Se abstrae de Centro de Control la funcionalidad de Operación
        Se crean prototipos que hereden de Operación para abstraer la funcionalidad
*/

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