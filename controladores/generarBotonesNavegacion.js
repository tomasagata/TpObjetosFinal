const generarBotonesNavegacion = (anterior, siguiente) => {
    let botones = "";
    if (anterior != undefined) {
        botones += `
        <li class="page-item"><a class="page-link" href="./generar_tickets?pagina=${anterior.pagina}&limite=${anterior.limite}">Anterior</a></li>
        `;
    }
    
    if (siguiente != undefined) {
        botones += `
        <li class="page-item"><a class="page-link" href="./generar_tickets?pagina=${siguiente.pagina}&limite=${siguiente.limite}">Siguiente</a></li>
        `;
    }
    
    let navegacion = `
        <nav aria-label="Botones Navegacion">
            <ul class="pagination">
                ${botones}
            </ul>
        </nav>
    `;
    return navegacion;
}

module.exports = generarBotonesNavegacion;