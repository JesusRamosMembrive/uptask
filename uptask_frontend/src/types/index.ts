import {z} from 'zod';

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

