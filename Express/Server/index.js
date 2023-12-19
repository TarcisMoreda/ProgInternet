// index.js
const express = require('express');  // Importando o express
const cors = require('cors');
const app = express();  // Inicializando o servidor
const port = 3000;  // Porta dedicada ao servidor

// middleware
app.use(express.json());
app.use(cors());     // Liberando acesso de qualquer origem

/*
GET: Pegar a informação (você não modifica a informação do servidor)
POST: Criar informação
PUT: Editar informação
DELETE: Remover informação
*/

// DADOS
let produtos = [
    { id: 1, nome: 'Mouse', preco: 20.00 },
    { id: 2, nome: 'Teclado', preco: 49.99 },
    { id: 3, nome: 'Headphone', preco: 79.90 },
]

// ROTAS d euma API REST
app.get('/', (request, response) => {
    return response.send('Rota inicial');
})

// Retornar todos os produtos
app.get('/produtos', (req, res) => {
    return res.send( produtos );
})


// Retornar um produto em específico
app.get('/produto/:id', (req, res) => {
    let id = req.params.id;

    for (let produto of produtos) {
        if ( produto.id == id ) {
            return res.send( produto );
        }
    }

    return res.send({ msg: 'Produto não encontrado' })
})

// Criar um novo produto
app.post('/produtos', (req, res) => {
    let nome = req.body.nome;
    let preco = req.body.preco;

    console.log(req.body)

    let id = produtos.length + 1;

    let prod = {
        id: id,
        nome: nome,
        preco: preco
    }
    produtos.push( prod );
    
    return res.send(prod);
})

// Editar um produto
app.put('/produtos/:id', (req, res) => {
    let id = req.params.id;

    let { nome, preco } = req.body;

    let index = produtos.findIndex(prod => prod.id == id);

    if ( index == -1 ) {
        return res.status(400).send({ msg: "Produto não encontrado" });
    }

    produtos[index].nome = nome;
    produtos[index].preco = preco;

    return res.send(produtos[index]);
})

// Remove um produto
app.delete('/produtos/:id', (req, res) => {
    let id = req.params.id;

    // Tenta pegar o produto
    let index = produtos.findIndex(prod => prod.id == id);
    // caso não exista, retorna um erro
    if ( index == -1 ) {
        return res.status(400).send({ msg: "Produto não encontrado" });
    }

    // Retira o elemento da lista
    produtos = produtos.filter(prod => prod.id != id);

    res.send({ id: id });
})




// Direcionando a porta ao servidor
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});