const generarTabla = tickets => {
    let filasTickets = "";

    tickets.forEach(ticket => {
        let fila = `
            <tr>
                <th scope="row">${ticket.idOperacion}</th>
                <td>${ticket.tipoOperacion}</td>
                <td>${ticket.idVehiculo}</td>
                <td>${ticket.tipoCombustible}</td>
                <td>${ticket.volumenCargado}</td>
                <td>${ticket.balanceCombustibleAnterior}</td>
                <td>${ticket.balanceCombustibleNuevo}</td>
                <td>${ticket.beneficio}</td>
            </tr>
        `;  
        filasTickets += fila;
    });
    
    let tabla = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">idOperacion</th>
                    <th scope="col">tipoOperacion</th>
                    <th scope="col">idVehiculo</th>
                    <th scope="col">tipoCombustible</th>
                    <th scope="col">volumenCargado</th>
                    <th scope="col">balanceCombustibleAnterior</th>
                    <th scope="col">balanceCombustibleNuevo</th>
                    <th scope="col">beneficio</th>
                </tr>
            </thead>
            <tbody>
                ${filasTickets}
            </tbody>
        </table>
    `;

    return tabla;
}

module.exports = generarTabla;