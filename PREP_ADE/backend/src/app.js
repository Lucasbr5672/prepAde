import express from "express"
import cors from "cors"

import conn from "./config/conn.js"

import Empresa from "./model/empresaModel.js"
import Usuario from "./model/usuarioModel.js"
import Publicacao from "./model/publicacaoModel.js"
import Curtida from "./model/curtidaModel.js"
import Comentario from "./model/comentarioModel.js"

import EmpresaRouter from "./router/empresaRouter.js"
import publicacaoRouter from "./router/publicacaoRouter.js"

const app = express()

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

conn
.sync()//{force:true}
.then()
.catch((error) => console.log(error));

app.use("/api/empresas",EmpresaRouter)
app.use("/api/publicacoes",publicacaoRouter)

app.use((req, res) => {
    res.status(404).json({ msg: "Rota não encontrada"});
})

export default app;