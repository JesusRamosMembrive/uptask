import type { Request, Response } from 'express';

export class TaskController {
    static createProject
        = async (req: Request, res: Response) =>
    {
        const {projectId} = req.params;
        console.log(`Creating task for project ${projectId}`);
        try {

            res.status(201).json({message: 'Project created'});
        }
        catch (e) {
            res.status(500).json({message: e.message});
        }
    }
}