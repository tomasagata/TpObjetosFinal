// Generador de IDs
const generadorId = (() => {
    let id = -1; // para que empiecen desde 0 y coincidan con el índice del arreglo en gasolinera

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

function Gasolina(costo, almacenajeMax, almacenajeActual, tipo, tiempoAprovisionamiento) {

    if (!(this instanceof Gasolina)) {
        return new Gasolina(costo, almacenajeMax, almacenajeActual, tipo, tiempoAprovisionamiento);
    }


    var _id = generadorId.genId();
    var _costo;
    var _almacenajeMax;
    var _almacenajeActual;
    var _tipoGasolina;
    var _tiempoAprovisionamiento;
    var _progresoAprovisionamiento;
    var _litrosProximoRelleno = 0;

    // SETTERs y GETTERs
    Object.defineProperty(this, "id", {
        get() {
            return _id;
        },
        enumerable: true
    });

    Object.defineProperty(this, "costo", {
        set(valor) {
            if (valor > 0) {
                _costo = valor;
            } else {
                throw new Error("[-] Costo inválido.");
            }
        },
        get() { return _costo; },
        enumerable: true
    });

    Object.defineProperty(this, "almacenajeMax", {
        set(valor) {
            if (valor >= 0) {
                _almacenajeMax = valor;
            } else {
                throw new Error("[-] Almacenaje máximo inválido.");
            }
        },
        get() { return _almacenajeMax; },
        enumerable: true
    });

    Object.defineProperty(this, "almacenajeActual", {
        set(valor) {
            // Se valida que el almacenaje sea correcto, es decir, no supere al máximo y sea superior a 500
            if (valor > _almacenajeMax) {
                throw new Error("[-] Almacenaje actual supera máximo permitido");
            } else if (valor >= 500) {
                _almacenajeActual = valor;
            } else if (valor >= 0) {
                _almacenajeActual = valor;
                console.log(`[!] Se necesita reponer combustible ${this.tipo}`);
            } else { throw new Error("[-] Almacenaje actual negativo"); }
        },
        get() { return _almacenajeActual; },
        enumerable: true
    });

    Object.defineProperty(this, "tipo", {
        set(tipo) {
            if (tipo.trim() == '') {
                console.log("[-] Ingrese el tipo de la gasolina");
            } else {
                // Eliminación de espacios en blanco innecesarios
                _tipoGasolina = tipo.trim().split(/\s+/).join(' ');
            }
        },
        get() { return _tipoGasolina; },
        enumerable: true
    });

    Object.defineProperty(this, "tiempoAprovisionamiento", {
        set(valor) {
            if (valor < 0) {
                throw new Error("[-] El tiempo de aprovisionamiento no puede ser negativo");
            } else {
                _tiempoAprovisionamiento = valor;
            }
        },
        get() { return _tiempoAprovisionamiento; },
        enumerable: true
    });

    Object.defineProperty(this, "progresoAprovisionamiento", {
        set(valor) {
            if (valor < -1) {
                throw new Error("[-] El progreso debe ser un numero positivo o -1");
            } else {
                _progresoAprovisionamiento = valor;
            }
        },
        get() { return _progresoAprovisionamiento; },
        enumerable: true
    });

    Object.defineProperty(this, "litrosProximoRelleno", {
        set(valor) {
            if (valor < 0) {
                throw new Error("[-] La cantidad a rellenar debe ser > 0");
            } else {
                _litrosProximoRelleno = valor;
            }
        },
        get() { return _litrosProximoRelleno; },
        enumerable: true
    });

    // Fin de SETTERs y GETTERs

    this.costo = costo;
    this.almacenajeMax = almacenajeMax;
    this.almacenajeActual = almacenajeActual;
    this.tipo = tipo;
    this.tiempoAprovisionamiento = tiempoAprovisionamiento;
    this.progresoAprovisionamiento = -1;
}

module.exports = { Gasolina };
