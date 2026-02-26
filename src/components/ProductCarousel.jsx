export default function ProductCarousel({ product, onNext, onPrev, currentIndex, totalItems }) {
    if (!product) return <p>Loading products...</p>;

    return (
        <div className="carousel-container">
            <h2>Featured Product</h2>
            <div className="product-card" key={product.id}>
                {product.image && (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                    />
                )}
                <div className="product-info">
                    <h3>{product.name}</h3>
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <p className="product-desc">{product.description}</p>
                </div>
            </div>

            <div className="carousel-controls">
                <button className="carousel-btn prev-btn" onClick={onPrev}>
                    &#8592; Previous
                </button>
                <span className="indicator">
                    {currentIndex} / {totalItems}
                </span>
                <button className="carousel-btn next-btn" onClick={onNext}>
                    Next &#8594;
                </button>
            </div>
        </div>
    );
}
