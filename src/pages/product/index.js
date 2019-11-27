import React, { Component } from 'react';
import api from '../../services/api';

import { PayPalButton } from "react-paypal-button-v2";

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
    render() {
        const { product } = this.state;

        return (
            <div className="product-info">
                <img src={product.avatar} alt={product.name}/>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p> URL: <a href={product.url}>{product.url} </a> </p>
                <div className="price"> <p>R$ {product.value} </p> </div>

                <button onClick={() => this.cartAdd(product._id, product.avatar,product.title, product.value)}
                className="botao-carrinho" type="button">Adicionar ao carrinho</button>

                <div className="PayPalButton"><PayPalButton
                    amount={product.value}
                    onSuccess={async (details, data) => {
                        try {
                            await api.post("/pedidos", {
                                id: details.id,
                                adress_line_1: details.payer.address.address_line_1,
                                admin_area_1: details.payer.address.admin_area_1,
                                admin_area_2: details.payer.address.admin_area_1,
                                country_code: details.payer.address.country_code,
                                postal_code: details.payer.address.postal_code,
                                given_name: details.payer.name.given_name,
                                surname: details.payer.name.surname,
                                email_adress: details.payer.email_address,
                                payer_id: details.payer.payer_id,
                                phone_number: details.payer.phone.phone_number.national_number,
                                currency_code: details.purchase_units[0].amount.currency_code,
                                value: details.purchase_units[0].amount.value
                            })
                            .then(returno =>{
                                console.log("Sucesso", returno);
                                alert("Cadastrado no banco local");

                            })
                            .catch(returno =>{
                                console.log("Erro", returno);
                                alert("Erro ao cadastrar no banco local");
                            });
                        } catch(err) {
                            console.log("error",err);
                            
                        } 

                        alert("Pedido realizado com sucesso!");
                    }}
                    onError={error => {
                        alert("Erro ao realizar o pedido!");
                        console.log('error', error);
                    }}
                    onCancel={cancelou => {
                        alert('Compra cancelada');
                    }}
                />
                </div> 
            </div>
        );   
    }
}