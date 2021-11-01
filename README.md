#Consigna

##Proyecto Gasolinera

Crear la simulación de una gasolinera:

La gasolinera tiene 3 tipos de combustible: Regular, Premium y Diesel.
Para cada combustible tiene un id, costo y almacenaje diferente.

Regular:
    Costo U$D 1
    Almacenaje 1000L
Premium:
    Costo U$D 2,3
    Almacenaje 750L
Diesel:
    Costo U$D 0,7
    Almacenaje 2000L

La gasolinera pide reestablecer la cantidad de combustible cuando llega al mínimo de 500L en su almacenaje.

La gasolinera recibe distinto tipo de automóviles con distintas capacidades: Motos, Autos, Camiones.

Motos:
    Capacidad 10L
    Tipo de Combustible Regular o Premium
Autos:
    Capacidad 50L
    Tipo de Combustible Regular o Premium
Camiones:
    Capacidad 100L
    Tipo de Combustible Diesel

Los automóviles que llegan a la gasolinera son creados de manera aleatoria

La gasolinera hace cierre de caja cada 10 automóviles generando un ticket con las todas las transacciones realizadas, las cuales tienen un id de operación.
    - Se tiene que mostrar la actualización de los almacenajes de la gasolinera.
    - Se tiene que mostrar cuando la gasolinera pide reestablecer la cantidad de combustible
    - Se tiene que mostrar la ganancia de cada transacción y la suma final
