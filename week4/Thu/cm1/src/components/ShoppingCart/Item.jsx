const Item = ({name,brand,quantity,subtotal,tax,availability,onDelete}) => {
return ( <div className="shopping-cart__item-details"> <div className="shopping-cart__item-name">
Name: {name} </div> <div>Brand: {brand}</div> <div>Quantity: {quantity}</div> <div>Subtotal: {subtotal}</div> <div>Tax: {tax}</div> <div>Availability: {availability}</div>

  <button
    className="shopping-cart__delete"
    onClick={onDelete}
  >
    Delete
  </button>
</div>


)
}

export default Item
