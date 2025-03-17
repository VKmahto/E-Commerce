import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showCODPopup, setShowCODPopup] = useState(false);
    const [codDetails, setCodDetails] = useState({
        bankName: "Select Bank",
        ifscCode: "",
        amount: "",
        paymentType: "Cash on Delivery"
    });

    // Static list of banks for dropdown
    const bankOptions = [
        "HDFC Bank",
        "State Bank of India",
        "ICICI Bank",
        "Axis Bank",
        "Punjab National Bank"
    ];

    // Load cart items from local storage when component mounts
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
    }, []);

    // Function to remove an item from the cart
    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Pricing calculations
    const totalMRP = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = 1768;
    const platformFee = 20;
    const shippingFee = 0; // Free shipping
    const totalAmount = totalMRP - discount + platformFee + shippingFee;

    // Handle COD Form Input Changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCodDetails({ ...codDetails, [name]: value });
    };

    // Handle COD Form Submission
    const handleCODSubmit = (e) => {
        e.preventDefault();
        alert("COD Details Submitted:\n" + JSON.stringify(codDetails, null, 2));
        setShowCODPopup(false);
        setShowModal(false);
    };

    return (
        <div className="container my-5">
            <h2 className="fw-bold text-center mb-4">Shopping Cart</h2>

            <div className="row">
                {/* Cart Items List */}
                <div className="col-md-8">
                    {cartItems.length === 0 ? (
                        <p className="text-center">Your cart is empty.</p>
                    ) : (
                        <ul className="list-group">
                            {cartItems.map((item) => (
                                <li key={item.id} className="list-group-item d-flex align-items-center">
                                    <img
                                        src={`http://localhost:2000${item.image}`}
                                        alt={item.name}
                                        className="rounded"
                                        style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "15px" }}
                                    />
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">{item.name}</h5>
                                        <p className="text-success mb-0">₹{item.price} x {item.quantity}</p>
                                    </div>
                                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Price Details Section */}
                <div className="col-md-4">
                    <div className="card p-3">
                        <h5 className="fw-bold mb-3">PRICE DETAILS ({cartItems.length} Items)</h5>
                        
                        <div className="d-flex justify-content-between">
                            <p>Total MRP</p>
                            <p>₹{totalMRP}</p>
                        </div>

                        <div className="d-flex justify-content-between text-success">
                            <p>Discount on MRP</p>
                            <p>-₹{discount}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                            <p>Coupon Discount</p>
                            <button className="btn btn-link p-0 text-primary">Apply Coupon</button>
                        </div>

                        <div className="d-flex justify-content-between">
                            <p>Platform Fee</p>
                            <p>₹{platformFee}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                            <p>Shipping Fee</p>
                            <p className="text-success">Free</p>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between fw-bold">
                            <p>Total Amount</p>
                            <p>₹{totalAmount}</p>
                        </div>

                        <button className="btn btn-primary w-100 mt-3" onClick={() => setShowModal(true)}>
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for Payment */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Total Amount: ₹{totalAmount}</p>
                    <p>Select a payment method:</p>
                    <button className="btn btn-success w-100 my-2">Pay with UPI</button>
                    <button className="btn btn-primary w-100 my-2">Pay with Credit Card</button>
                    <button className="btn btn-warning w-100 my-2" onClick={() => setShowCODPopup(true)}>
                        Cash on Delivery
                    </button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for COD Details */}
            <Modal show={showCODPopup} onHide={() => setShowCODPopup(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cash on Delivery Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCODSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Bank Name</Form.Label>
                            <Form.Select
                                name="bankName"
                                value={codDetails.bankName}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="Select Bank" disabled>Select Bank</option>
                                {bankOptions.map((bank, index) => (
                                    <option key={index} value={bank}>{bank}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>IFSC Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="ifscCode"
                                placeholder="Enter IFSC Code"
                                value={codDetails.ifscCode}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                placeholder="Enter Amount"
                                value={codDetails.amount}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Confirm COD
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Cart;
