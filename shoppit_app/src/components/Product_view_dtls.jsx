import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Product_view_dtls = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:2000/shopapp/api/product/${id}/`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
        };

        fetchProductDetails();
    }, [id]);

    const addToCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || []; 
        const itemExists = cart.find((item) => item.id === product.id);

        if (!itemExists) {
            cart.push({ ...product, quantity: 1 });
            localStorage.setItem("cart", JSON.stringify(cart));

            // Dispatch a custom event
            window.dispatchEvent(new Event("cartUpdated"));

            Swal.fire({
                title: "Success!",
                text: "Product added to cart!",
                icon: "success",
                confirmButtonText: "Go to Cart",
                allowOutsideClick: false, // Prevent accidental dismissal
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/cart");
                }
            });
        } else {
            Swal.fire({
                title: "Oops!",
                text: "Product already in cart!",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
    };

    if (!product) {
        return <div className="text-center my-5">Loading...</div>;
    }
  return (
    <div className="container my-5">
    <div className="row">
        {/* Left Side: Image */}
        <div className="col-md-6 text-center">
        <img
            src={`http://localhost:2000${product.image.replace(/\/media\/media\//, "/media/")}`}
            className="img-fluid rounded"
            alt={product.name}
            style={{ width: "500px", height: "400px", objectFit: "cover" }}
        />
        {/* Small Thumbnails */}
        {/* <div className="d-flex justify-content-center gap-2 mt-3">
            {product.image && product.image.slice(0, 5).map((img, index) => (
                <img 
                    key={index} 
                    src={`http://localhost:2000${img.replace(/\/media\/media\//, "/media/")}`} 
                    className="rounded shadow-sm"
                    alt={`Thumbnail ${index + 1}`}
                    style={{ width: "80px", height: "80px", objectFit: "cover", cursor: "pointer" }}
                    onClick={() => setProduct({ ...product, image: img })}
                />
            ))}
        </div> */}
        </div>

        {/* Right Side: Product Details (With Margin) */}
        <div className="col-md-6 mt-md-0 mt-4">
        <h2 className="fw-bold">{product.name}</h2>
        <p className="text-muted">{product.description}</p>
        <h4 className="text-success">₹{product.price}</h4>
        <button className="btn btn-primary btn-lg mt-3" onClick={addToCart}>Add to Cart</button>
        </div>
    </div>
    </div>
  )
}

export default Product_view_dtls
