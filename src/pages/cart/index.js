import React, { Component } from 'react';
import api from '../../services/api';


export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1,
    };

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        this.setState({ products: docs, productInfo, page });
    };
    render() {
        const { products, page, productInfo } = this.state

        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <img src={product.avatar} alt={product.name}/>
                        <strong>{product.title}</strong>
                        <p>R$ {product.value.toFixed(2)}</p>
                    
                    </article>
                ))}
            </div>
        )
    }
}    