import type{Request, Response, NextFunction} from 'express';
import Task , {ITask} from "../models/Task";

declare global{
    namespace Express{
        interface Request{
            task: ITask
        }
    }
}

export async function taskExists(req: Request, res: Response, next: NextFunction)
{
    try{
        const {taskId} = req.params;
        const task = await Task.findById(taskId);
        if(!task){
            const error = new Error('Project not found');
            res.status(404).json({error: error.message});
        }

        req.task = task;
        next();
    }
    catch (e){
        res.status(500).json({message: e.message});
    }
}

export function taskBelongsToProject(req: Request, res: Response, next: NextFunction)
{
    if(req.task.project.toString() !== req.project.id.toString()){
        const error = new Error('Action no valid');
        res.status(400).json({error: error.message});
    }

    next();
}