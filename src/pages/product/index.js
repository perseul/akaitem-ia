import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

export default class Product extends Component {
    state = {
        product: {},
    };

    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/products/${id}`);

        this.setState({ product: response.data });
    }

    cartAdd = (produtoParaAdd) => {
        var carrinho = localStorage.getItem('carrinho');
        
        if (carrinho === null) {
            
            var produtos = [produtoParaAdd];
            console.log(produtos); 
            localStorage.setItem('carrinho',JSON.stringify(produtos));
            var carrinhoNovo = localStorage.getItem('carrinho');
            console.log('ID Produtos',carrinhoNovo);
       
        } else {
            
            var produtosDoCarrinho = localStorage.getItem('carrinho'); // eslint-disable-next-line
            var produtosDoCarrinho = JSON.parse(produtosDoCarrinho); 
            console.log(produtosDoCarrinho);
           

            if (produtosDoCarrinho.includes(produtoParaAdd) === false){
                
                produtosDoCarrinho.push(produtoParaAdd);
                localStorage.setItem('carrinho',JSON.stringify(produtosDoCarrinho));
                var carrinhoAtualizado = localStorage.getItem('carrinho');
                console.log('carrinhoAtualizado',carrinhoAtualizado);
                
            }
        }
    }
    render() {
        const { product } = this.state;

        return (
            <div className="product-info">
                <img src={product.avatar} alt={product.name}/>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p> URL: <a href={product.url}>{product.url} </a> </p>
                <div className="price"> <p>R$ {product.value} </p> </div>

                <button onClick={() => this.cartAdd(product)}
                className="botao-carrinho" type="button">Adicionar ao carrinho</button>
            </div>
        );   
    }
}