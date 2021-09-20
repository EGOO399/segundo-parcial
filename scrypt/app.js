
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')

const templatecard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}


document.addEventListener('DOMContentLoaded', () => {
    fetchData ()
    //para guardar la info en localStorge
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito ()

    }
})

cards.addEventListener('click', e =>{
    addCarrito (e)
}) 
// para los botones de diminuir y amunetar productos

items.addEventListener('click', e =>{
    btnAccion(e)
})

//para acceder al api.json
const fetchData = async () => {
    try{
        const res = await fetch('api.json')
        const data = await res.json()
        //console.log(data)
         pintarCards(data)
    }catch (error){
        console.log(error)
    }
}


// para mostrar la tarjeta con los productos
const pintarCards = data => {
    //console.log(data)
    data.forEach(producto => {
        templatecard.querySelector('h5').textContent = producto.title
        templatecard.querySelector('p').textContent = producto.precio
        templatecard.querySelector('img').setAttribute("src", producto.imagen)
        templatecard.querySelector('h6').textContent = producto.observaciones
        templatecard.querySelector('button').dataset.id = producto.id

        const clone = templatecard.cloneNode(true)
        fragment.appendChild(clone)

        
    });
    cards.appendChild(fragment)

}
const addCarrito = e =>{
    //console.log(e.target)
   // console.log(e.target.classList.contains('btn-dark'))
    if (e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement) 
    }
    e.stopPropagation()
}

const setCarrito = Object =>{
    //console.log(Object)
    const producto = {
        id: Object.querySelector('.btn-dark').dataset.id,
        title: Object.querySelector('h5').textContent,
        precio: Object.querySelector('p').textContent,
        cantidad: 1
    }
    // para ir sumando los productos a nuestro carrito 
    //cundo sean de los mismos
    if (carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    pintarCarrito()



}
//para pintar el carrito hay que hacer el recorrido
const pintarCarrito = () =>{
    //console.log(carrito)
    items.innerHTML=''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelector('td').textContent=producto.title
        templateCarrito.querySelector('.pre').textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id 
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()
    //para guardar los datos en el localstore
                      //con stringify
    localStorage.setItem('carrito', JSON.stringify(carrito))
}
const pintarFooter = () =>{
    footer.innerHTML=''
//mostramos el mensaje que el carrito esta vacio 
    if(Object.keys(carrito).length === 0){
      footer.innerHTML = `
      <th scope="row" colspan="s"> Carrito Vacio - empieza a comprar</th>
      `
     //para que nos vuelva aparecer el carrito vacio
     //cundo precionemos el boton vaciar carrito
      return
    
    }

    const nCantidad = Object.values(carrito).reduce((acc,{cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad, precio}) => acc + precio * cantidad,0)
    //console.log(nPrecio)

    templateFooter.querySelector('td').textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)
    //el booton para poder vaciar nuestro carrito
    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () =>{
        carrito  = {}
        pintarCarrito ()
    })
   

}
//funcion para los botones de aumentar y disminuir
 
const btnAccion = e => {
    //para ver que los botones se estan pintando
   // console.log(e.target)
    //accion de aumentar
    if(e.target.classList.contains('btn-info')){
        //carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad ++
        //producto.cantidad = carrito[e.target.dataset.id]. cantidad + 1
        carrito[e.target.dataset.id] = {...producto}

        pintarCarrito ()

    }
    //accion para disminuir

    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad --
        //para eliminar cuando llegue a 0 la cantidad
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]

        }

        pintarCarrito ()



    }
    e.stopPropagation()
}

