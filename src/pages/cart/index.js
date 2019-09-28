import React, { Component } from 'react';

export default class Main extends Component {

    render() {
        
        const { total=0 , valor = 0, i = 0 } = this.state

        for(i=1; i<=99; i++ ){
            var prod = localStorage.getItem("produto" + i + "");
            if (prod != null)
            {
                document.getElementById("itens").innerHTML += localStorage.getItem("produto" + i );
                document.getElementById("itens").innerHTML += " ";
                document.getElementById("itens").innerHTML += "R$: " + localStorage.getItem("valor" + i );

                valor = parseFloat(localStorage.getItem("valor + i "));
                total = (total + valor );
            }
        }

        return (
            document.getElementById("total").innerHTML = total.toFixed(2)
        )
    }
}    