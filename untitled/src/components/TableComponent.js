import { React, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function TableComponent({ data }) {
    const [selectedQuantities, setSelectedQuantities] = useState({});

    useEffect(() => {
        // Extract the item IDs and quantities from the JSON data
        const initialQuantities = data.reduce((quantities, item) => {
          quantities[item.id] = item.quantity || 0;
          return quantities;
        }, {});
    
        setSelectedQuantities(initialQuantities);
    }, [data]);

    function updateCartItemQuantity(itemId, newQuantity) {
        let idList = "cart" in localStorage ? JSON.parse(localStorage.getItem("cart")) : [];
      
        const existingItem = idList.find((item) => item.id === itemId);
        if (existingItem) {
          // Update the quantity of the existing item
          existingItem.quantity = newQuantity;
        }
      
        localStorage.setItem("cart", JSON.stringify(idList));
        window.dispatchEvent(new Event('storage'));
        console.log(idList);
    }

    const handleQuantityChange = (itemId, quantity) => {
        setSelectedQuantities((prevQuantities) => ({
          ...prevQuantities,
          [itemId]: quantity,
        }));
        updateCartItemQuantity(itemId, quantity);
    };

    const handleRemoveItem = (itemId) => {
        removeCartItem(itemId); // Remove item from local storage
    };

    const removeCartItem = (itemId) => {
        let idList = "cart" in localStorage ? JSON.parse(localStorage.getItem("cart")) : [];

        const updatedList = idList.filter((item) => item.id !== itemId);

        localStorage.setItem("cart", JSON.stringify(updatedList));
        window.dispatchEvent(new Event('storage'));
        console.log(updatedList);
        window.location.reload();
    };

    const totalPrice = data.reduce((sum, item) => {
        const quantity = selectedQuantities[item.id] || 0;
        return sum + item.price * quantity;
    }, 0);

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>  
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={item.id}>
                    <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>{index + 1}</td>
                    <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>{item.name}</td>
                    <td style={{ verticalAlign: 'middle' }}>
                        <input
                        type="number"
                        min="0"
                        value={selectedQuantities[item.id] || ''}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        />
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>{(item.price * (selectedQuantities[item.id] || 0)).toFixed(2)}€</td>
                    <td style={{ verticalAlign: 'middle' }}>
                        <Button variant="outline-danger" onClick={() => handleRemoveItem(item.id)}>Remove</Button>
                    </td>
                </tr>
            ))}
            <tr><td></td><td></td><td></td><td></td><td></td></tr>
            <tr>
                <td colSpan="4" style={{ textAlign: 'left', verticalAlign: 'middle' }}>Total</td>
                <td style={{ verticalAlign: 'middle' }}>{totalPrice.toFixed(2)}€</td>
            </tr>
            </tbody>
        </Table>
    );
}

export default TableComponent;
