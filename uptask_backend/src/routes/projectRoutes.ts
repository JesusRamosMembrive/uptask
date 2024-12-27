import {Router} from "express";
import {ProjectController} from "../controllers/ProjectController";
import {body} from "express-validator";
const router = Router();

router.get('/',
    body('name').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripción del proyecto es obligatoria'),
    ProjectController.getAllProjects);



router.post('/', ProjectController.createProject);

export default router;