import {Router} from "express";
import {ProjectController} from "../controllers/ProjectController";
import {body, param} from "express-validator";
import {handleInputErrors} from "../middleware/validation";
import Task from "../models/Task";
import {TaskController} from "../controllers/TaskController";
const router = Router();

router.post('/',
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripción del proyecto es obligatoria'),
    handleInputErrors,
    ProjectController.createProject);


router.get('/', ProjectController.getAllProjects);


router.get('/:id',
    param('id').isMongoId().withMessage('ID not valid'),
    handleInputErrors,
    ProjectController.getProjectByID
);


router.put('/:id',
    param('id').isMongoId().withMessage('ID not valid'),
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripción del proyecto es obligatoria'),
    handleInputErrors,
    ProjectController.updateProject
);

router.delete('/:id',
    param('id').isMongoId().withMessage('ID not valid'),
    handleInputErrors,
    ProjectController.deleteProject
);

// Route to get all tasks from a project
router.post('/:projectId/tasks',
    TaskController.createProject
);


export default router;