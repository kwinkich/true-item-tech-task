const Task = require('../models/Task');
const idGenerator = require('../utils/idGenerator');

class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    getAllTasks() {
        return this.taskRepository.findAll();
    }

    getTaskById(id) {
        const task = this.taskRepository.findById(id);
        if (!task) {
            throw new Error('Task not found');
        }
        return task;
    }

    createTask(title) {
        const validation = Task.validate({ title });
        if (!validation.isValid) {
            throw new Error(validation.errors.join(', '));
        }

        const task = new Task(title.trim());
        task.id = idGenerator.generate();
        
        return this.taskRepository.save(task);
    }

    updateTask(id, updateData) {
        const existingTask = this.taskRepository.findById(id);
        if (!existingTask) {
            throw new Error('Task not found');
        }

        if (updateData.title !== undefined) {
            const validation = Task.validate({ title: updateData.title });
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '));
            }
            updateData.title = updateData.title.trim();
        }

        existingTask.update(updateData);
        return this.taskRepository.update(id, existingTask);
    }

    deleteTask(id) {
        const exists = this.taskRepository.findById(id);
        if (!exists) {
            return false;
        }
        return this.taskRepository.delete(id);
    }

    toggleTaskStatus(id) {
        const task = this.getTaskById(id);
        task.completed = !task.completed;
        return this.taskRepository.update(id, task);
    }

    deleteCompletedTasks() {
        const completedTasks = this.taskRepository.findAll()
            .filter(task => task.completed);
        
        completedTasks.forEach(task => {
            this.taskRepository.delete(task.id);
        });
        
        return completedTasks.length;
    }
}

module.exports = TaskService;