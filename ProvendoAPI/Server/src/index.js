// index.js
const express = require("express"); // Importando o express
const cors = require("cors");
const mysql = require("mysql");
const config = require("./config");
const app = express(); // Inicializando o servidor
const port = 3000; // Porta dedicada ao servidor

// middleware
app.use(express.json());
app.use(cors()); // Liberando acesso de qualquer origem

// conectando ao banco de dados
// lembra de mudar as credenciais pfvr
const mysql_con = mysql.createConnection(config.credentials);
mysql_con.connect((err) => {
  if (err) throw err;
  console.log("Mysql server connected.");
});

/*
GET: Pegar a informação (você não modifica a informação do servidor)
POST: Criar informação
PUT: Editar informação
DELETE: Remover informação
*/

// ROTAS de uma API REST

// Retorna os 10 primeiros filmes
app.get("/", (_, res) => {
  mysql_con.query("SELECT * FROM filmes LIMIT 10", (err, result, _) => {
    if (err)
      return res.send({
        response: "Fail",
        values: [],
      });

    return res.send({
      response: "Success",
      values: result,
    });
  });
});

// Retorna a página x com 10 filmes
app.get("/filmes/:pg", (req, res) => {
  const start = parseInt(req.params.pg);
  if (isNaN(start) || start < 1)
    return res.send({
      response: "Invalid request",
      values: [],
    });

  mysql_con.query(
    `SELECT * FROM filmes LIMIT ${(start - 1) * 10}, 10`,
    (err, result, _) => {
      if (err)
        return res.send({
          response: "Fail",
          values: [],
        });

      return res.send({
        response: "Success",
        values: result,
      });
    }
  );
});

// Retorna os filmes com nome parecidos
app.get("/filmes/busca/:palavra", (req, res) => {
  const word = req.params.palavra.toLowerCase();
  let final = [];

  mysql_con.query(
    `SELECT * FROM filmes WHERE titulo LIKE '%${word}%'`,
    (err, movies, _) => {
      if (err)
        return res.send({
          response: "Fail",
          values: [],
        });

      final = JSON.parse(JSON.stringify(movies));

      mysql_con.query(`SELECT * FROM generos`, (err, genres, _) => {
        if (err)
          return res.send({
            response: "Fail",
            values: [],
          });

        let ids = "";
        for (let movie of movies) ids += `${movie.id},`;
        ids = ids.slice(0, -1);

        mysql_con.query(
          `SELECT * FROM filmes_generos WHERE filme_id IN (${ids})`,
          (err, result, _) => {
            if (err)
              return res.send({
                response: "Fail",
                values: [],
              });

            for (let movie in movies) {
              let mov_gen = [];
              for (let genre of result)
                if (genre.filme_id == movies[movie].id)
                  mov_gen.push(genre.genero_id);

              for (let id in mov_gen) {
                let index = genres.map((e) => e.id).indexOf(mov_gen[id]);
                mov_gen[id] = genres[index].titulo;
              }

              final[movie]["generos"] = mov_gen;
            }

            return res.send({
              response: "Success",
              values: final,
            });
          }
        );
      });
    }
  );
});

// Retorna o filme do id
app.get("/filme/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 1)
    return res.send({
      response: "Invalid request",
      values: {},
    });

  mysql_con.query(`SELECT * FROM filmes WHERE id=${id}`, (err, result, _) => {
    if (err)
      return res.send({
        response: "Fail",
        values: {},
      });

    return res.send({
      response: "Success",
      values: result[0],
    });
  });
});

// Retorna todos os filmes de um genero
app.get("/generos/:genero", (req, res) => {
  const word = req.params.genero;

  mysql_con.query(
    `SELECT id FROM generos WHERE titulo LIKE '%${word}%'`,
    (err, genre, _) => {
      if (err)
        return res.send({
          response: "Fail",
          values: [],
        });

      genre = genre[0].id;
      mysql_con.query(
        `SELECT filme_id FROM filmes_generos WHERE genero_id=${genre}`,
        (err, ids, _) => {
          if (err)
            return res.send({
              response: "Fail",
              values: [],
            });

          let movie_ids = "";
          for (let id of ids)
            if (movie_ids.indexOf(id.filme_id) == -1)
              movie_ids += `${id.filme_id},`;
          movie_ids = movie_ids.slice(0, -1);

          mysql_con.query(
            `SELECT * FROM filmes WHERE id IN (${movie_ids})`,
            (err, movies, _) => {
              if (err)
                return res.send({
                  response: "Fail",
                  values: [],
                });

              return res.send({
                response: "Success",
                values: movies,
              });
            }
          );
        }
      );
    }
  );
});

app.get("/ator/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 1)
    return res.send({
      response: "Invalid request",
      values: {},
    });

  mysql_con.query(`SELECT * FROM atores WHERE id=${id}`, (err, ator, _) => {
    if (err)
      return res.send({
        response: "Fail",
        values: {},
      });

    mysql_con.query(
      `SELECT * FROM atores_filmes WHERE ator_id=${id}`,
      (err, ids, _) => {
        if (err)
          return res.send({
            response: "Fail",
            values: {},
          });

        let movie_ids = "";
        for (let id of ids)
          if (movie_ids.indexOf(id.filme_id) == -1)
            movie_ids += `${id.filme_id},`;
        movie_ids = movie_ids.slice(0, -1);

        mysql_con.query(
          `SELECT titulo FROM filmes WHERE id IN (${movie_ids})`,
          (err, movies, _) => {
            if (err)
              return res.send({
                response: "Fail",
                values: {},
              });

            ator[0]["filmes"] = [];

            for (let movie of movies) ator[0]["filmes"].push(movie.titulo);

            return res.send({
              response: "Success",
              values: ator[0],
            });
          }
        );
      }
    );
  });
});

app.get("/atores/busca/:palavra", (req, res) => {
  const word = req.params.palavra;

  mysql_con.query(
    `SELECT * FROM atores WHERE titulo LIKE '%${word}%'`,
    (err, ator, _) => {
      if (err)
        return res.send({
          response: "Fail",
          values: [],
        });

      let id = "";
      for (let actor of ator) id += `${actor.id},`;
      id = id.slice(0, -1);

      mysql_con.query(
        `SELECT * FROM atores_filmes WHERE ator_id IN (${id})`,
        (err, ids, _) => {
          if (err)
            return res.send({
              response: "Fail",
              values: [],
            });

          let movie_ids = "";
          for (let id of ids)
            if (movie_ids.indexOf(id.filme_id) == -1)
              movie_ids += `${id.filme_id},`;
          movie_ids = movie_ids.slice(0, -1);

          for (let actor in ator) {
            ator[actor]["filmes"] = [];
            for (let id of ids)
              if (id.ator_id == ator[actor].id)
                ator[actor]["filmes"].push(id.filme_id);
          }

          mysql_con.query(
            `SELECT id, titulo FROM filmes WHERE id IN (${movie_ids})`,
            (err, movies, _) => {
              if (err)
                return res.send({
                  response: "Fail",
                  values: [],
                });

              for (let i in ator)
                for (let movie of movies) {
                  let index = ator[i]["filmes"].indexOf(movie.id);
                  if (index !== -1) ator[i]["filmes"][index] = movie.titulo;
                }

              return res.send({
                response: "Success",
                values: ator,
              });
            }
          );
        }
      );
    }
  );
});

// Criar um novo produto
app.post("/atores", (req, res) => {
  const name = req.body.nome;
  if (name == undefined)
    return res.send({
      response: "Fail",
      values: {},
    });

  mysql_con.query(
    "SELECT id FROM atores ORDER BY id DESC LIMIT 1",
    (err, id, _) => {
      if (err)
        return res.send({
          response: "Fail",
          values: {},
        });

      const next_id = parseInt(id[0].id) + 1;
      mysql_con.query(
        `INSERT INTO atores (id, titulo) VALUES (${next_id}, '${name}')`,
        (err, response, _) => {
          if (err)
            return res.send({
              response: "Fail",
              values: {},
            });

          mysql_con.query(
            "SELECT * FROM atores ORDER BY id DESC LIMIT 1",
            (err, actor, _) => {
              if (err)
                return res.send({
                  response: "Fail",
                  values: {},
                });

              return res.send({
                response: "Success",
                values: actor[0],
              });
            }
          );
        }
      );
    }
  );
});

app.put("/atores/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const name = req.body.nome;
  if (id == undefined || name == undefined)
    return res.send({
      response: "Fail",
      values: {},
    });

  mysql_con.query(
    `SELECT titulo FROM atores WHERE id=${id}`,
    (err, actor, _) => {
      if (err)
        return res.send({
          response: "Fail",
          values: {},
        });

      mysql_con.query(
        `UPDATE atores SET titulo='${name}' WHERE id=${id}`,
        (err, response, _) => {
          if (err)
            return res.send({
              response: "Fail",
              values: {},
            });

          return res.send({
            response: "Success",
            values: {
              id: id,
              titulo: name,
            },
          });
        }
      );
    }
  );
});

app.delete("/atores/:id", (req, res) => {
  const id = req.params.id;

  mysql_con.query(`DELETE FROM atores WHERE id=${id}`, (err, response, _) => {
    if (err)
      return res.send({
        response: "Fail",
        values: {},
      });

    return res.send({
      response: "Success",
      values: { id },
    });
  });
});

app.post("/participacoes/:idAtor/:idFilme", (req, res) => {
  const id_actor = req.params.idAtor;
  const id_movie = req.params.idFilme;

  mysql_con.query(
    `SELECT * FROM atores WHERE id=${id_actor}`,
    (err, response, _) => {
      if (err)
        return res.send({
          response: "Fail",
          values: {},
        });

      if (response.length != 1)
        return res.send({
          response: "Fail",
          values: {},
        });
    }
  );

  mysql_con.query(
    `SELECT * FROM filmes WHERE id=${id_movie}`,
    (err, response, _) => {
      if (err)
        return res.send({
          response: "Fail",
          values: {},
        });

      if (response.length != 1)
        return res.send({
          response: "Fail",
          values: {},
        });
    }
  );

  mysql_con.query(
    "SELECT id FROM atores_filmes ORDER BY id DESC LIMIT 1",
    (err, id, _) => {
      if (err)
        return res.send({
          response: "Fail",
          values: {},
        });

      const next_id = parseInt(id[0].id) + 1;
      mysql_con.query(
        `INSERT INTO atores_filmes (id, ator_id, filme_id) VALUES (${next_id}, ${id_actor}, ${id_movie})`,
        (err, new_entry, _) => {
          if (err)
            return res.send({
              response: "Fail",
              values: {},
            });

          return res.send({
            response: "Success",
            values: {
              id: next_id,
              ator_id: id_actor,
              filme_id: id_movie,
            },
          });
        }
      );
    }
  );
});

app.delete("/participacoes/:idAtor/:idFilme", (req, res) => {
  const id_actor = req.params.idAtor;
  const id_movie = req.params.idFilme;

  mysql_con.query(
    `SELECT * FROM atores WHERE id=${id_actor}`,
    (err, response, _) => {
      if (err)
        return res.send({
          response: "Fail",
          values: {},
        });

      if (response.length != 1)
        return res.send({
          response: "Fail",
          values: {},
        });
    }
  );
  console.log("a");

  mysql_con.query(
    `SELECT * FROM filmes WHERE id=${id_movie}`,
    (err, response, _) => {
      if (err)
        return res.send({
          response: "Fail",
          values: {},
        });

      if (response.length != 1)
        return res.send({
          response: "Fail",
          values: {},
        });
    }
  );

  mysql_con.query(
    `SELECT id FROM atores_filmes WHERE ator_id=${id_actor} AND filme_id=${id_movie}`,
    (err, response, _) => {
      if (err)
        return res.send({
          response: "Fail",
          values: {},
        });

      mysql_con.query(
        `DELETE FROM atores_filmes WHERE ator_id=${id_actor} AND filme_id=${id_movie}`,
        (err, new_entry, _) => {
          if (err)
            return res.send({
              response: "Fail",
              values: {},
            });

          return res.send({
            response: "Success",
            values: {
              id: response[0].id,
            },
          });
        }
      );
    }
  );
});

// Direcionando a porta ao servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
