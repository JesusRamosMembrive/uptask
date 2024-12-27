import type {Request, Response} from "express";
import Project from "../models/Project";

export class ProjectController{

    static getAllProjects = async(req: Request, res: Response)=>{
        try {
            const project = await Project.find({});
            res.json(project);
        }
        catch (error) {
            res.status(500).send('Hubo un error');
        }
    }


    static getProjectByID = async(req: Request, res: Response)=>{
        const {id} = req.params;
        try {
            const project = await Project.findById(id);
            if(!project){
                const error = new Error('Project not found');
                res.status(404).json({error: error.message});
            }
            res.json(project);
        }
        catch (error) {
            res.status(500).send('Hubo un error');
        }
    }


    static createProject = async(req: Request, res: Response)=>{
        const project = new Project(req.body);

        try {
            await project.save();
            res.send('Proyecto creado correctamente');
        }
        catch (error) {
            res.status(500).send('Hubo un error');
        }
    }

    static updateProject = async(req: Request, res: Response)=>{
        const {id} = req.params;
        try {
            const project = await Project.findById(id, req.body);
            if(!project){
                const error = new Error('Project not found');
                res.status(404).json({error: error.message});
            }
            await project.updateOne(req.body);
            res.send('Proyecto actualizado correctamente');
        }
        catch (error) {
            res.status(500).send('Hubo un error');
        }
    }

    static deleteProject = async(req: Request, res: Response)=>{
        const {id} = req.params;
        try {
            const project = await Project.findByIdAndDelete(id, req.body);

            if(!project){
                const error = new Error('Project not found');
                res.status(404).json({error: error.message});
            }

            await project.deleteOne();
            res.send('Proyecto borrado correctamente');
        }
        catch (error) {
            res.status(500).send('Hubo un error');
        }
    }
}

