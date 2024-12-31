import {z} from 'zod';

/**Task */
export const TaskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed']);

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string().min(1, 'El nombre del proyecto no puede estar vacío'),
    description: z.string().min(1, 'La descripción del proyecto no puede estar vacía'),
    project: z.string().min(1, 'El cliente del proyecto no puede estar vacía'),
    status: TaskStatusSchema
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description' >;

/**Project */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string().min(1, 'El nombre del proyecto no puede estar vacío'),
    clientName: z.string().min(1, 'El cliente del proyecto no puede estar vacía'),
    description: z.string().min(1, 'La descripción del proyecto no puede estar vacía')
});


export const dashboardProjectSchema =
    z.array(projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    }));


export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>

