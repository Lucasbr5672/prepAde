import Curtida from "../model/curtidaModel.js";
import Empresa from "../model/empresaModel.js";

export const getEmpresa = async (req, res) => {
    //1° Buscar informação da empresa -> tabela_empresa
    try {
        const infoEmpresa = await Empresa.findByPk(1, {raw: true});

    //2° contar a quantidade de likes da tabela curtida

    const likes = await Curtida.count({
        where: {
            tipo_avaliacao: "up",
        },
    });

    const deslikes = await Curtida.count({
        where: {
            tipo_avaliacao: "down",
        },
    })
    infoEmpresa.likes = likes
    infoEmpresa.deslikes = deslikes
    res.status(200).json(infoEmpresa);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "erro ao buscar dados da empresa"})
    }

};