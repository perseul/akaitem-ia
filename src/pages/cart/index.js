import React, { Component } from 'react';
import api from '../../services/api';

import { PayPalButton } from "react-paypal-button-v2";

import './styles.css';

export default class Cart extends Component{
    state = {
        product: {},
    };

    // async componentDidMount() {
    //     const { id } = this.props.match.params;

    //     const response = await api.get(`/products/${id}`);

    //     this.setState({ product: response.data });
    // }

    // cartRead = () => {
    //     document.body.querySelector("itens").innerHTML = localStorage.getItem('carrinho')
    // }

    clearCarrinho = () => {
    localStorage.clear('carrinho');
    window.location.reload();
        
    }

    getCarrinho = () => {
        var produtosCarrinho = localStorage.getItem('carrinho');
        if(produtosCarrinho !== null) {
            return JSON.parse(produtosCarrinho);
        }
        return [];
    }
    render() {
        var total = 0;
        return(
            <div className="cart-info">
                {this.getCarrinho().map(product => {
                    total = total + product.value;
                    return (
                        <article className="box-info" key={product._id}>
                            <div className="box-img">
                                <img src={product.avatar} alt={product.name}/>
                            </div>
                            <div className="box-texto">
                                <strong>{product.title}</strong>
                                <p>R$ {product.value.toFixed(2)}</p>
                            </div>
                        </article>
                    )
                })}
                
                <div className="botoes">
                <button type="button" className="botao-carrinho" 
                onClick={() => this.getCarrinho()}> Carregar produtos </button> 

                <button onClick={() => this.clearCarrinho()}
                className="botao-limpa" type="button">Limpar carrinho</button>
                </div>

                <div className="total">Total: {total.toFixed(2)}</div>

                <div className="PayPalButton"><PayPalButton
                    amount={total}
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
                        localStorage.clear('carrinho');
                        window.location.reload();
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

