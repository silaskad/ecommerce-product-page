import './App.css'
import Header from './components/header/header.jsx'
import Product from './components/product/Product.jsx'
import { useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
  const [cart, setCart] = useState([]);
  const productObj = {
    id: nanoid(),
    manufacturer: 'Sneaker Company',
    name: 'Fall Limited Edition Sneakers',
    description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
    pricing: {
      regular: 250,
      sale: 125,
      currency: 'USD',
      get discount() {
        if (this.sale >= this.regular) {
          return 0;
        }
        return (1 - this.sale / this.regular) * 100;
      },
      total(quantity) {
        const totalPrice = this.sale * quantity;

        return totalPrice;
      }
    },
    images: {
      full: [
        './assets/image-product-1.jpg',
        './assets/image-product-2.jpg',
        './assets/image-product-3.jpg',
        './assets/image-product-4.jpg',
      ],
      thumbnails: [
        { id: nanoid() , src: './assets/image-product-1-thumbnail.jpg' },
        { id: nanoid() , src: './assets/image-product-2-thumbnail.jpg' },
        { id: nanoid() , src: './assets/image-product-3-thumbnail.jpg' },
        { id: nanoid() , src: './assets/image-product-4-thumbnail.jpg' },
      ],
    },
  };

  function handleAddToCart(product, quantity) {
    const addedProduct = {
      id: nanoid(),
      name: product.name,
      purchaseQuantity: quantity,
      pricing: {
        sale: product.pricing.sale,
        total: product.pricing.total(quantity),
        currency: 'USD'
      },
      thumbnail: [product.images.thumbnails[0].src],
    }

    setCart(prev => {
      return [...prev, addedProduct];
    })
  }

  function handleRemoveFromCart(id) {
    setCart(prev => prev.filter(c => {
      return c.id !== id;
    }));
  }

  return(
    <>
    <Header cart={cart} handleRemoveFromCart={handleRemoveFromCart} />
    <main id='main'>
      <Product productObj={productObj} handleAddToCart={handleAddToCart} />
    </main>
    </>
  )
}

export default App
