# akaitem ia app
----------------

### Overview
O ia akaitem app é um aplicativo desenvolvido com react com integração a biblioteca de pagamento do paypal, onde foi implementado uma interface de vendas

### Tecnologia
* React
* Node

### Como utilizar (how to)
* _É necessario ter o Node.js instalado em sua maquina para executar os comandos npm no seu console (cmd)_ 

_digite o seguinte comando para instalar as dependecias do projeto (esse comando irá criar a pasta: node_modules no seu projeto, *obs utilizar o comando --force para não ter problemas com as dependencias, pode forçar que o aplicativo irá instalar corretamente):_
```
npm install --force
```
_com a pasta node_modules em seu projeto digite o seguinte comando para iniciar seu aplicatico react em um server local:_
```
npm start
```
_Pagina inicial com os produtos_
![Captura de tela_2023-06-12_23-20-02](https://github.com/perseul/akaitem/assets/53841377/6fbdddc4-ccf5-4833-82a5-2314b83e3635)

_Carrinho de compras_
![Captura de tela_2023-06-12_23-26-01](https://github.com/perseul/akaitem/assets/53841377/dceb37af-b1f3-4578-a5f4-fed56bc0be52)

### Models de request para os produtos:
utilize a api desenvolvida com node.js para realizar as requisições (ia-product-api) o link do repositorio se encontra na seção 'Links'
_recomendação utilizar o Insomnia (link para download na seção de link) para realizar as requisições [post, put, delete e get]:_
_request example json_
```
{
  "title":"playstation 5",
  "description":"playstation 5",
  "avatar":"https://images.kabum.com.br/produtos/fotos/sync_mirakl/181395/Console-Playstation-5-825GB-Leitor-Digital-PS5-_1658863170_g.jpg",
  "value":"50000",
  "url":""
}
```
## Links
* [Download Node.js](https://nodejs.org/en)
* [Download Insomnia rest](https://insomnia.rest/download)
* [ia-product-api:](https://github.com/perseul/node-api)

----------------
