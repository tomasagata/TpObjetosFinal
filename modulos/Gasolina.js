function Gasolina() {

    if (!(this instanceof Gasolina)) {
        return new Gasolina();
    }

    Gasolina.contador = ++Gasolina.contador || 1;
    var _id = Gasolina.contador;

    Object.defineProperty(this, "id", {
        get() {
            return _id;
        }
    });

}

module.exports = Gasolina;