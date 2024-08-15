import { useCallback, useState } from "react";
import Product from "../data/Product";

interface OrderLineItem {
    product: number;
    quantity: number;
}

interface OrderFormProps {
    products: Product[];
}

const OrderForm = (props: OrderFormProps) => {
    const [product, setProduct] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(0);
    const [orderLineItems, setOrderLineItems] = useState<OrderLineItem[]>([]);

    const addItem = useCallback(() => {
        setOrderLineItems([...orderLineItems, { product: product!, quantity }]);
        setProduct(null);
        setQuantity(0);
    }, [orderLineItems, product, quantity]);

    const addItemEnabled = product !== null && quantity > 0;

    const totalPrice = orderLineItems.reduce((total, orderLineItem) => {
        const product = props.products.find(product => product.id === orderLineItem.product);
        return total + (product?.price || 0) * orderLineItem.quantity;
    }, 0)

    const submitOrder = useCallback(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:8000/api/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({order_products: orderLineItems}),
        }).then(response => {
            if (response.ok) {
                setOrderLineItems([]);
                console.log('Order submitted');
            } else {
                console.error('Failed to submit order');
        }})
    }, [orderLineItems])

    return (
        <div>
            <h3>Order Form</h3>
            <p>Select Product</p>
            <select onChange={(e) => setProduct(Number.parseInt(e.target.value))}>
                <option value="">Select Product</option>
                {props.products.map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                ))}
            </select>
            <p>Quantity</p>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Number.parseInt(e.target.value))} />
            <button disabled={!addItemEnabled} onClick={addItem}>Add Item</button>
            <h3>Order Summary</h3>
            <table>
                <thead>
                    <th>Product</th>
                    <th>Quantity</th>
                </thead>
                <tbody>
                    {orderLineItems.map((orderLineItem, index) => (
                        <tr key={index}>
                            <td>{props.products.find(product => product.id === orderLineItem.product)?.name}</td>
                            <td>{orderLineItem.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Price: {totalPrice}</p>
            <button onClick={submitOrder}>Submit Order</button>
        </div>
    )
}

export default OrderForm;
