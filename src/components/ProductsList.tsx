import React from 'react';
import Product from '../data/Product';

interface ProductsListProps {
    products: Product[];
}

const ProductsList = (props: ProductsListProps) => {
    const { products } = props;

    return (
        <div>
        <h3>Products</h3>
        <table>
            <thead>
                <th>id</th>
                <th>price</th>
                <th>name</th>
                <th>category</th>
            </thead>
            <tbody>
                {
                    products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.price}</td>
                            <td>{product.name}</td>
                    
                            <td>{product.category?.name}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    )
}

export default ProductsList;
