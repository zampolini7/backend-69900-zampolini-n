document.addEventListener('DOMContentLoaded', () => {
  const socket = io() // Conectar al servidor de socket.io
  console.log('Socket.IO conectado')

  socket.on('products', (data) => {
    console.log('Productos recibidos:', data)
    const productList = document.getElementById('product-list')
    productList.innerHTML = '' // Limpiar lista existente

    data.forEach((product) => {
      const li = document.createElement('li')
      li.textContent = `${product.title} - ${product.price}`
      const button = document.createElement('button')
      button.textContent = 'Eliminar'
      button.setAttribute('id', product.id) // Guardar el ID del producto en un atributo de datos
      const div = document.createElement('div')

      div.appendChild(li)
      div.appendChild(button)

      productList.appendChild(div)
    })
  })

  // Event delegation: agregar un único event listener al contenedor
  const productList = document.getElementById('product-list')
  productList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const productId = event.target.getAttribute('id')
      try {
        const response = fetch(`/realtimeproducts/${productId}`, {
          method: 'DELETE',
        })
        if (response) {
          console.log('Producto eliminado correctamente')
        } else {
          console.error('Error al enviar el producto')
        }
      } catch (error) {
        console.error('Error de red:', error)
      }
    }
  })

  const form = document.getElementById('form')
  const title = document.getElementById('title')
  const description = document.getElementById('description')
  const price = document.getElementById('price')

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const product = {
      title: title.value,
      description: description.value,
      price: price.value,
    }

    try {
      const response = await fetch('/realtimeproducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })

      if (response.ok) {
        console.log('Producto enviado correctamente')
      } else {
        console.error('Error al enviar el producto')
      }
    } catch (error) {
      console.error('Error de red:', error)
    }
  })
})
