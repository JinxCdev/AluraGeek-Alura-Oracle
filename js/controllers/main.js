import { servicesProducts } from "../services/product-services.js";

const listadoProductos = document.querySelector('#listado-productos');
const formulario = document.querySelector('#formulario');

function createCard (nombre, precio, imagen, id) {
    const card = document.createElement('card');
    card.classList.add('card');

    card.innerHTML = `
        <img src="${ imagen }" class="card__img" alt="${ nombre }">

        <div class="card__descripcion">
            <p class="card__descripcion__title">${ nombre }</p>
            <div class="card__descripcion__precio"">
                <span>$${ precio }</span>
                <div data-borrar id="${ id }">
                    <img src="img/basurero.svg" alt="Logo para eliminar">
                </div>
            </div>
        </div>
    `;

    const btnBorrar = card.querySelector('[data-borrar]');
    btnBorrar.addEventListener('click', async() => {
        try {
            await servicesProducts.borrarProducto(id);
            card.remove();
        } catch (error) {
            console.log(error);
        }
    })

    listadoProductos.appendChild( card );
    return card;
}

const render = async() => {
    try {
        const listProduct = await servicesProducts.productList();

        listProduct.forEach( producto => {
            listadoProductos.appendChild(
                createCard(
                    producto.nombre, 
                    producto.precio, 
                    producto.imagen, 
                    producto.id
                )
            );
        });
    } catch (error) {
        console.log(error);
    }
} 

formulario.addEventListener('submit', e => {
    e.preventDefault();

    const nombre = document.querySelector('[data-nombre]').value;
    const precio = document.querySelector('[data-precio]').value;
    const imagen = document.querySelector('[data-imagen]').value;

    servicesProducts.createProducto( nombre, precio, imagen )
        .then(res => console.log(res))
        .catch( error => console.log(error) )
});

render();