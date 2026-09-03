export function orders () {
    const cart = localStorage.getItem("cart")
    //Order.findById(orderId).populate("items.product", "image");
    return(
        <div>
            <h1>Your prevuios orders </h1>
            {cart?.items.map((item) => {
                <div>
                    <h3 className="name">{item.name}</h3>
                    <p className="price">{item.price}</p>
                    <p className="quantity">{item.quantity}</p>
                </div>
            })}
            <p className="total">{cart.total}</p>
            <p className="phone">{cart.phone}</p>
            <p className="adress">{cart.adress}</p>
            <p className="status"><strong>{cart.status}</strong></p>
        </div>
    )
}