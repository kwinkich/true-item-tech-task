const request = require('supertest');
const app = require('../../src/server');

describe('Tasks API Integration Tests', () => {
    beforeEach(async () => {
        try {
            await request(app).post('/test/clear').send();
        } catch (err) {
            console.log('Clear failed but continuing');
        }
    });
    
    describe('GET /api/tasks', () => {
        test('should return empty array initially', async () => {
            const response = await request(app)
                .get('/api/tasks')
                .expect(200);
            
            expect(response.body.success).toBe(true);
            expect(response.body.count).toBe(0);
            expect(response.body.data).toEqual([]);
        });
        
        test('should return all tasks', async () => {
            await request(app).post('/api/tasks').send({ title: 'Task 1' });
            await request(app).post('/api/tasks').send({ title: 'Task 2' });
            
            const response = await request(app)
                .get('/api/tasks')
                .expect(200);
            
            expect(response.body.success).toBe(true);
            expect(response.body.count).toBe(2);
            expect(response.body.data).toHaveLength(2);
        });
    });
    
    describe('POST /api/tasks', () => {
        test('should create a new task', async () => {
            const response = await request(app)
                .post('/api/tasks')
                .send({ title: 'Integration test task' })
                .expect(201);
            
            expect(response.body.success).toBe(true);
            expect(response.body.data.title).toBe('Integration test task');
            expect(response.body.data.completed).toBe(false);
            expect(response.body.data.id).toBeDefined();
        });
        
        test('should return 400 for empty title', async () => {
            const response = await request(app)
                .post('/api/tasks')
                .send({ title: '' })
                .expect(400);
            
            expect(response.body.error).toBeDefined();
        });
    });
    
    describe('DELETE /api/tasks/:id', () => {
        test('should delete existing task and return 200', async () => {
            const createResponse = await request(app)
                .post('/api/tasks')
                .send({ title: 'To delete' })
                .expect(201);
            
            const taskId = createResponse.body.data.id;
            
            const deleteResponse = await request(app)
                .delete(`/api/tasks/${taskId}`)
                .expect(200);
            
            expect(deleteResponse.body.success).toBe(true);
            expect(deleteResponse.body.message).toBe('Task deleted successfully');
            
            const getResponse = await request(app)
                .get('/api/tasks')
                .expect(200);
            
            expect(getResponse.body.count).toBe(0);
            expect(getResponse.body.data).toHaveLength(0);
        });
        
        test('should return 404 for non-existent task', async () => {
            const response = await request(app)
                .delete('/api/tasks/999')
                .expect(404);
            
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Task not found');
        });
        
        test('should return 400 for invalid ID format', async () => {
            const response = await request(app)
                .delete('/api/tasks/invalid')
                .expect(400);
            
            expect(response.body.error).toBeDefined();
        });
    });
    
    describe('PATCH /api/tasks/:id/toggle', () => {
        test('should toggle task status', async () => {
            const createResponse = await request(app)
                .post('/api/tasks')
                .send({ title: 'Toggle me' })
                .expect(201);
            
            const taskId = createResponse.body.data.id;
            expect(createResponse.body.data.completed).toBe(false);
            
            const toggleResponse = await request(app)
                .patch(`/api/tasks/${taskId}/toggle`)
                .expect(200);
            
            expect(toggleResponse.body.success).toBe(true);
            expect(toggleResponse.body.data.completed).toBe(true);
        });
        
        test('should return 404 for non-existent task', async () => {
            const response = await request(app)
                .patch('/api/tasks/999/toggle')
                .expect(404);
            
            expect(response.body.error).toBe('Task not found');
        });
    });
});