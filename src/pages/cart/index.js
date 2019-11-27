import React, { Component } from 'react';
import api from '../../services/api';

import { PayPalButton } from "react-paypal-button-v2";

import './styles.css';

export default class Cart extends Component{
    state = {
        product: {},
    };

    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/products/${id}`);

        this.setState({ product: response.data });
    }

    cartRead = () => {
        var total = 0;
        var value = 0;
        var id = 0;

        var prod = localStorage.getItem("produto");
        if (prod != null){
            document.getElementById("itens").innerHTML += localStorage.getItem("avatar");
            document.getElementById("itens").innerHTML += localStorage.getItem("title");
            document.getElementById("itens").innerHTML += localStorage.getItem("value");

            value = parseFloat(localStorage.getItem("value"));
            total = (total + value); 
        }
        document.getElementById("total").innerHTML = total.toFixed(2);  
    }
    
    render() {
        const { product } = this.state;

        return (
            <div className="itens">
                <img src={product.avatar} alt={product.name}/>
                <h1>{product.title}</h1>
                <div className="price"> <p>R$ {product.value} </p> </div>
                <div className="PayPalButton"><PayPalButton
                    amount={}
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
                <button type="button" className="botao-carrinho" onclick=" localStorage.clear(); location.reload();"> Limpar carrinho </button> 
            </div>
        );   
    }
}