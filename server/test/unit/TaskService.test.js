const TaskService = require('../../src/services/TaskService');
const TaskRepository = require('../../src/repositories/TaskRepository');
const idGenerator = require('../../src/utils/idGenerator');

describe('TaskService', () => {
    let taskService;
    let taskRepository;
    
    beforeEach(() => {
        taskRepository = new TaskRepository();
        taskService = new TaskService(taskRepository);
        idGenerator.reset();
        taskRepository.clear();
    });
    
    describe('createTask', () => {
        test('should create a new task with valid title', () => {
            const task = taskService.createTask('Test task');
            
            expect(task.title).toBe('Test task');
            expect(task.completed).toBe(false);
            expect(task.id).toBe(1);
        });
        
        test('should throw error for empty title', () => {
            expect(() => {
                taskService.createTask('');
            }).toThrow('Title is required and must be a string');
        });
        
        test('should throw error for title with only spaces', () => {
            expect(() => {
                taskService.createTask('   ');
            }).toThrow('Title cannot be empty');
        });
        
        test('should trim whitespace from title', () => {
            const task = taskService.createTask('  Hello World  ');
            expect(task.title).toBe('Hello World');
        });
        
        test('should throw error for too long title', () => {
            const longTitle = 'a'.repeat(201);
            expect(() => {
                taskService.createTask(longTitle);
            }).toThrow('cannot exceed 200 characters');
        });
    });
    
    describe('getAllTasks', () => {
        test('should return empty array when no tasks', () => {
            const tasks = taskService.getAllTasks();
            expect(tasks).toEqual([]);
        });
        
        test('should return all created tasks', () => {
            taskService.createTask('Task 1');
            taskService.createTask('Task 2');
            
            const tasks = taskService.getAllTasks();
            expect(tasks).toHaveLength(2);
            expect(tasks[0].title).toBe('Task 1');
            expect(tasks[1].title).toBe('Task 2');
        });
    });
    
    describe('deleteTask', () => {
        test('should delete existing task', () => {
            const task = taskService.createTask('To delete');
            expect(taskService.getAllTasks()).toHaveLength(1);
            
            const deleted = taskService.deleteTask(task.id);
            expect(deleted).toBe(true);
            expect(taskService.getAllTasks()).toHaveLength(0);
        });
        
        test('should return false when deleting non-existent task', () => {
            const deleted = taskService.deleteTask(999);
            expect(deleted).toBe(false);
        });
    });
    
    describe('toggleTaskStatus', () => {
        test('should toggle task completion status', () => {
            const task = taskService.createTask('Toggle me');
            expect(task.completed).toBe(false);
            
            const toggled = taskService.toggleTaskStatus(task.id);
            expect(toggled.completed).toBe(true);
            
            const toggledAgain = taskService.toggleTaskStatus(task.id);
            expect(toggledAgain.completed).toBe(false);
        });
        
        test('should throw error for non-existent task', () => {
            expect(() => {
                taskService.toggleTaskStatus(999);
            }).toThrow('Task not found');
        });
    });
});