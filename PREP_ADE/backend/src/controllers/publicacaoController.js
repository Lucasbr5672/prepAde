import Publicacao from "../model/publicacaoModel.js";
import { literal } from "sequelize";

export const getAll = async (res, req) => {
    try {
        //1 Buscar informações de publicações
        const publicacao = await Publicacao.findAll({
            raw:true,
            attributes:[
                "id",
                "titulo",
                "local",
                "cidade",
                "imagem",
                //Adicionar likes
                [literal(`(
                    SELECT COUNT(*) FROM curtidas
                    WHERE curtidas.publicacao_id = publicacoes.id
                    AND curtidas.tipo_avaliacao = 'up'
                )`), "total Likes"],
                // [literal(`()`), "total Deslikes"],
                // [literal(`()`), "total Comentarios"]
            ]
        })
        res.status(200).json(publicacao)
    } catch (error) {
        console.log(error)
        res.status(500).json({err:"Erro"})
    }
    //2 Buscar likes individualmente
    //3 Buscar deslike individualmente
    //4 Buscar conmentarios individualmente
};