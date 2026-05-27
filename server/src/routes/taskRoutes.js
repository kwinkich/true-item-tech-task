const express = require('express');
const { validateTaskCreation, validateIdParam } = require('../middleware/validation');

const router = express.Router();

const createTaskRoutes = (taskController) => {
    
    router.get('/', taskController.getAllTasks);

    router.delete('/completed', taskController.deleteCompletedTasks);
    
    router.get('/:id', validateIdParam, taskController.getTaskById);
    
    router.post('/', validateTaskCreation, taskController.createTask);
    
    router.put('/:id', validateIdParam, taskController.updateTask);
    
    router.delete('/:id', validateIdParam, taskController.deleteTask);
    
    router.patch('/:id/toggle', validateIdParam, taskController.toggleTaskStatus);
    
    return router;
};

module.exports = createTaskRoutes;