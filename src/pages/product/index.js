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

    render() {
        const { product } = this.state;

        return (
            <div className="product-info">
                <img src={product.avatar} alt={product.name}/>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p> URL: <a href={product.url}>{product.url} </a> </p>
       

        <PayPalButton amount={product.value} onSuccess={ async  (details, data) => {
        console.log("detauiks",details);
        console.log("detauiks",data);
        
        try {
        await api.post("/pedidos", {
            id: details.id,
            adress_line_1: details.payer.address.adress_line_1,
            admin_area_1: details.payer.address.admin_area_1,
            admin_area_2: details.payer.address.admin_area_1,
            country_code: details.payer.address.country_code,
            postal_code: details.payer.address.postal_code,
            given_name: details.payer.name.given_name,
            surname: details.payer.name.surname,
            email_adress: details.payer.email_adress,
            payer_id: details.payer.payer_id,
            phone_number: details.payer.phone.phone_number,
            currency_code: details.purchase_units[0].amount.currency_code,
            value: details.purchase_units[0].amount.value
        })

        .then(returno =>{
            console.log("Sucesso", returno);
        })
        .catch(returno =>{
            console.log("Erro", returno);
        });
    }catch(err){
        console.log("error",err);
    } 
        alert("Transaction completed by " + details.payer.name.given_name);
            return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({ orderID: data.orderID })
          });
        }}
    /> 
            </div>
        );   
    }
}