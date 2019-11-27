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

    cartAdd = (id,avatar,title,value) => {
        var carrinho = localStorage.getItem('carrinho');
        
        if (carrinho === null) {
            
            var produtos = [id,avatar,title,value];
            console.log(produtos); 
            localStorage.setItem('carrinho',JSON.stringify(produtos));
            var carrinhoNovo = localStorage.getItem('carrinho');
            console.log('ID Produtos',carrinhoNovo);
       
        } else {
            
            var produtosDoCarrinho = localStorage.getItem('carrinho'); // eslint-disable-next-line
            var produtosDoCarrinho = JSON.parse(produtosDoCarrinho); 
            console.log(produtosDoCarrinho);
           

            if (produtosDoCarrinho.includes(id,avatar,title,value) === false){
                
                produtosDoCarrinho.push(id,avatar,title,value);
                localStorage.setItem('carrinho',JSON.stringify(produtosDoCarrinho));
                var carrinhoAtualizado = localStorage.getItem('carrinho');
                console.log('carrinhoAtualizado',carrinhoAtualizado);
                
            }
        }
    }
    goTocart = (id, value) => {
        this.cartAdd(id);
       // window.location.href="/cart";
    }
    
    /* Função alternativa
    AddCarrinho = (produto, valor, posicao ) => {
        localStorage.setItem("produto" + posicao, produto);
        localStorage.setItem("valor" + posicao, valor);
        alert("Produto adicionado no carrinho !")
    }
    */

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
                            <Link to={`/products/${product._id}`}>Saiba +</Link>
                            <button onClick={() => this.cartAdd(product._id, product.avatar, product.title, product.value)}
                             className="botao-carrinho" type="button">  
                                 Adicionar ao carrinho
                            </button> 
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