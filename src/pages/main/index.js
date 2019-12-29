import React, { Component } from 'react';
import api from  "../../services/api";
import { Link } from 'react-router-dom';


import "./styles.css";

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

    prevPage = () => {
        const { page } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }
    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;
        
        this.loadProducts(pageNumber)
    }

   cartAdd = (produtoParaAdd) => {
        var carrinho = localStorage.getItem('carrinho');
        
        if (carrinho === null) {
            
            var produtos = [produtoParaAdd];
            console.log(produtos); 
            localStorage.setItem('carrinho',JSON.stringify(produtos));
            var carrinhoNovo = localStorage.getItem('carrinho');
            console.log('ID Produtos',carrinhoNovo);
            alert("Produto adicionado ao carrinho !");
        } else {
            
            var produtosDoCarrinho = localStorage.getItem('carrinho'); // eslint-disable-next-line
            var produtosDoCarrinho = JSON.parse(produtosDoCarrinho); 
            console.log(produtosDoCarrinho);
            alert("Produto adicionado ao carrinho !");

            if (produtosDoCarrinho.includes(produtoParaAdd) === false){
                
                produtosDoCarrinho.push(produtoParaAdd);
                localStorage.setItem('carrinho',JSON.stringify(produtosDoCarrinho));
                var carrinhoAtualizado = localStorage.getItem('carrinho');
                console.log('carrinhoAtualizado',carrinhoAtualizado);
                alert("Produto adicionado ao carrinho !");
            }
        }
    }    
    render() {
        const { products, page, productInfo } = this.state

        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <img src={product.avatar} alt={product.name}/>
                        <strong>{product.title}</strong>
                        <p>R$ {product.value.toFixed(2)}</p>
                        <div className="botoes-compra">
                            <Link to={`/products/${product._id}`}>Saiba + sobre</Link>
                            <button onClick={() => this.cartAdd(product)}
                            className="botao-carrinho" type="button">Adicionar ao carrinho</button>
                        </div>    
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        )
    }
}