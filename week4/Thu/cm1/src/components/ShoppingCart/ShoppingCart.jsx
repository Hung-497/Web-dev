import { useState } from "react"
import Item from "./Item"
import "./ShoppingCart.css"

function ShoppingCart() {
  const [shopingCarts, setShopingCarts] = useState([])
  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  const [quantity, setQuantity] = useState("")
  const [subtotal, setSubtotal] = useState("")
  const [tax, setTax] = useState("")
  const [availability, setAvailability] = useState("In stock")

  function addItem() {
    if (name.trim() !== "" && brand.trim() !== "" && quantity.trim() !== "" && subtotal.trim() !== "" && tax.trim() !== "" && availability.trim() !== "")
    {setShopingCarts((s) => [...s, {name, brand, quantity, subtotal, tax, availability}])
    setName("")
    setBrand("")
    setQuantity("")
    setSubtotal("")
    setTax("")
    setAvailability("In stock")
  }
  }

  function handleDeleteItem(index) {
    const updatedShoppingCarts = shopingCarts.filter((_ ,i) => i !== index )
    setShopingCarts(updatedShoppingCarts)
  }
  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleBrandChange(event) {
    setBrand(event.target.value)
  }

  function handleQuantityChange(event) {
    setQuantity(event.target.value)
  }

  function handleSubtotalChange(event) {
    setSubtotal(event.target.value)
  }

  function handleTaxChange(event) {
    setTax(event.target.value)
  }

  function handleAvailabilityChange(event) {
    setAvailability(event.target.value)
  }

  return (
    <div className="shopping-cart">
      <h1 className="shopping-cart__title">ShoppingCartList</h1>
      <input className="shopping-cart__input" type="text" value={name} placeholder="Enter your name" onChange={handleNameChange}></input>
      <input className="shopping-cart__input" type="text" value={brand} placeholder="Enter the brand" onChange={handleBrandChange}></input>
      <input className="shopping-cart__input" type="number" value={quantity} placeholder="Enter the quantity" onChange={handleQuantityChange}></input>
      <input className="shopping-cart__input" type="number" value={subtotal} placeholder="Enter the subtotal" onChange={handleSubtotalChange}></input>
      <input className="shopping-cart__input" type="number" value={tax} placeholder="Enter the tax" onChange={handleTaxChange}></input>
      <select className="shopping-cart__input" value={availability} onChange={handleAvailabilityChange}>
        <option>In stock</option>
        <option>Out of stock</option>
      </select>
      <button className="shopping-cart__add" type="button" onClick={addItem}>Add</button>
      <ol className="shopping-cart__list">
        {shopingCarts.map((item, index) => (
          <li className="shopping-cart__list-item" key={index}>
            <Item {...item} onDelete={() => handleDeleteItem(index)} />
          </li>
        ))}
      </ol>
    </div>
  )
}


export default ShoppingCart

