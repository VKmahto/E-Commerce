import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Product_view_dtls = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [productImages, setProductImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
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

        const fetchProductImages = async () => {
            try {
                const response = await axios.get(`http://localhost:2000/shopapp/api/product/${id}/images/`);
                setProductImages(response.data);
                if (response.data.length > 0) {
                    const firstImageUrl = `http://localhost:2000${response.data[0].image.replace(/\/media\/media\//, "/media/")}`;
                    setSelectedImage(firstImageUrl);
                }
            } catch (error) {
                console.error('Error fetching product images:', error);
            }
        };

        fetchProductDetails();
        fetchProductImages();
    }, [id]);

    const addToCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const itemExists = cart.find((item) => item.id === product.id);
        if (!itemExists) {
            console.log("Selected Image:", selectedImage);
            const productToAdd = {
                ...product,
                quantity: 1,
                image: selectedImage // Save full image URL
                
            };

            cart.push(productToAdd);
            localStorage.setItem("cart", JSON.stringify(cart));
            window.dispatchEvent(new Event("cartUpdated"));

            Swal.fire({
                title: "Success!",
                text: "Product added to cart!",
                icon: "success",
                confirmButtonText: "Go to Cart",
                allowOutsideClick: false,
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
                <div className="col-md-6 text-center">
                    <img
                        src={selectedImage}
                        className="img-fluid rounded shadow"
                        alt={product.name}
                        style={{ width: "500px", height: "400px", objectFit: "cover" }}
                    />
                    <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
                        {productImages.map((imgObj, index) => {
                            const imgUrl = `http://localhost:2000${imgObj.image.replace(/\/media\/media\//, "/media/")}`;
                            return (
                                <img
                                    key={index}
                                    src={imgUrl}
                                    className={`rounded shadow-sm ${selectedImage === imgUrl ? 'border border-primary' : ''}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    style={{ width: "80px", height: "80px", objectFit: "cover", cursor: "pointer" }}
                                    onClick={() => setSelectedImage(imgUrl)}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="col-md-6 mt-md-0 mt-4">
                    <h2 className="fw-bold">{product.name}</h2>
                    <p className="text-muted">{product.description}</p>
                    <h4 className="text-success">₹{product.price}
                    </h4>
                    <button className="btn btn-primary btn-lg mt-3" onClick={addToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Product_view_dtls;