import {Router} from "express";
import {ProjectController} from "../controllers/ProjectController";
import {body, param} from "express-validator";
import {handleInputErrors} from "../middleware/validation";
import {taskBelongsToProject, taskExists} from "../middleware/task";
import {TaskController} from "../controllers/TaskController";
import {projectExists} from "../middleware/project";
const router = Router();

router.param('projectId', projectExists);

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
    body('name').notEmpty().withMessage('El nombre de la task es obligatorio'),
    body('description').notEmpty().withMessage('La descripción de la task es obligatoria'),
    TaskController.createTask
);

router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)

router.param('taskId', taskExists);
router.param('taskId', taskBelongsToProject);


router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID not valid'),
    handleInputErrors,
    TaskController.getTaskByID
)

router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID not valid'),
    body('name').notEmpty().withMessage('El nombre de la task es obligatorio'),
    body('description').notEmpty().withMessage('La descripción de la task es obligatoria'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID not valid'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('ID not valid'),
    body('status').notEmpty().withMessage('El status de la task es obligatorio'),
    handleInputErrors,
    TaskController.updateStatus
)



export default router;