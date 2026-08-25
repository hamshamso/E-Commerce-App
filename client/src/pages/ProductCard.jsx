 function ProductCard({product}) {
    return(
        <>
            <div className="product-container">
                <div className="card">
                    <img className="product-img" src={product.image} alt={product.name}/>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">{product.price}</p>
                    <p className="product-category">{product.category}</p>
                    <p className="product-quantity">{product.quantity}</p>
                    <button type="submit" className="add-to-cart">Add to cart</button>
                </div>
            </div>
        </>
    )
}
export default ProductCard