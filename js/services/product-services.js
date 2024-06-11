const productList = () => {
    return fetch('http://localhost:3001/productos')
        .then(response => response.json())
        .catch(error => console.log(error));
}

const createProducto = ( nombre, precio, imagen ) => {
    return fetch('http://localhost:3001/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            nombre, 
            precio, 
            imagen 
        })
    }).then( res => res.json() ).catch( err => console.log(err) )
}

const borrarProducto = ( id ) => {
    return fetch(`http://localhost:3001/productos/${id}`, {
        method: "DELETE",
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const servicesProducts = {
    productList,
    createProducto,
    borrarProducto
}