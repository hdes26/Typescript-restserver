import { Request, Response } from "express";
import Usuario from "../models/usuario";



export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll();
    try {
        res.json({ usuarios });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error});
    }
}


export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (usuario) {
        res.json(usuario)
    } else {
        res.status(404).json({
            msg: `No se encontro un usuario con el id ${id}`
        });
    }

    try {
        res.json({ usuario });
    } catch (error) {
        console.log(error);
    }
}


export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;

    
    try {

        const existeEmail:any = await Usuario.findOne({
            where:{
                email:body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg:`Ya existe un  usuario con el email ${body.email}`
            });
        }

        const usuario =  Usuario.build(body);
        await usuario.save();

        res.json({usuario});

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Hable con el administrador'});
    }
}


export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk( id );

        if (!usuario) {
            return res.status(404).json({
                msg:`No existe un  usuario con el id ${id}`
            }); 
        }

        await usuario.update(body);

        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Hable con el administrador'});
    }
}


export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

        const usuario = await Usuario.findByPk( id );

        if (!usuario) {
            return res.status(404).json({
                msg:`No existe un  usuario con el id ${id}`
            }); 
        }

        await usuario.update({ estado:false });

        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Hable con el administrador'});
    }
}

