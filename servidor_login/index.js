// 1 Instalar os pacotes express, cors, nodmeon
// 2 Criar o script do nodemon no package.json
// 3 Importar os pacotes e inicializá-los
// 4 Criar a Rota inicial
// 5 Iniciar a escuta do servidor em uma porta escohida

const express = require('express');  // Importando o express
const cors = require('cors');
const bd = require('./bd'); // Importando a conexão como BD

const app = express();  // Inicializando o servidor
const port = 3000;  // Porta dedicada ao servidor


// middleware
app.use(express.json());
app.use(cors());     // Liberando acesso de qualquer origem





app.get('/', (req, res) => {
    res.send('Servidor funcionando')
})


app.get('/pokemon', async (req, res) => {
    let listaPoke = await bd.query("SELECT id, nome FROM pokemon");

    return res.status(200).json(listaPoke);
});


// http://localhost:3000/pokemon/busca/pikachu
app.get('/pokemon/busca/:nome', async (req, res) => {
    let nome = req.params.nome;
    
    let poke = await bd.query(
        `SELECT * FROM pokemon WHERE nome = ?`,        // SQL
        [nome]                                         // Lista de variáveis
    );
    
    return res.status(200).json(poke);
});





// Direcionando a porta ao servidor
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});