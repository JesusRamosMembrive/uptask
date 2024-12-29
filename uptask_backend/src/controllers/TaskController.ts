import type { Request, Response } from 'express';
import Project from "../models/Project";
import Task from "../models/Task";

export class TaskController {
    static createTask
        = async (req: Request, res: Response) =>
    {
        try{
            const task = new Task(req.body);
            console.log(task);
            task.project = req.project.id;
            req.project.tasks.push(task.id);
            await Promise.allSettled([task.save(), req.project.save()]);
            res.send('Task created');
        }
        catch (e){
            res.status(500).json({message: e.message});
        }
    }

    static getProjectTasks = async (req: Request, res: Response) =>
    {
        try{
            const tasks = await Task.find({project: req.project.id}).populate('project');
            res.json(tasks);
        }
        catch (e){
            res.status(500).json({message: e.message});
        }
    }

    static getTaskByID = async (req: Request, res: Response) => {
        try {

            if(req.task.project.toString() !== req.project.id.toString()){
                const error = new Error('Action no valid');
                res.status(400).json({error: error.message});
            }

            res.json(req.task);
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    }

    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name;
            req.task.description = req.body.description;
            await req.task.save();

            res.send('Task updated correctly');
        } catch (error) {
            res.status(500).send('Task not updated');
        }
    }

    static deleteTask = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter(
                (task) => task.toString() !== req.task.id.toString());

            await Promise.allSettled([req.task.deleteOne(), req.project.save()]);

            res.send('Task deleted correctly');
        }catch (error){
            res.status(500).send('Task not deleted');
        }
    }

    static updateStatus = async (req: Request, res: Response) => {
        try {
            const {status} = req.body;
            req.task.status = status;
            await req.task.save();
            res.send('Task status update correctly');
        } catch (error) {
            res.status(500).send('Status not updated');
        }
    }
}