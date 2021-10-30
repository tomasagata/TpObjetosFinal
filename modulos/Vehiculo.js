function Vehiculo() {

    if (!(this instanceof Vehiculo)) {
        return new Vehiculo();
    }

}

module.exports = Vehiculo;