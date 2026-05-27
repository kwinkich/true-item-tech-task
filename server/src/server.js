const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const createTaskRoutes = require('./routes/taskRoutes');
const TaskController = require('./controllers/TaskController');
const TaskService = require('./services/TaskService');
const TaskRepository = require('./repositories/TaskRepository');

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "unsafe-none" }
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
    skip: () => config.isTest
});
app.use('/api', limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

if (process.env.NODE_ENV === 'test') {
    app.post('/test/clear', (req, res) => {
        taskRepository.clear();
        const idGenerator = require('./utils/idGenerator');
        idGenerator.reset();
        console.log('🧹 Test data cleared');
        res.json({ cleared: true });
    });
}

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv
    });
});

app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong', timestamp: new Date().toISOString() });
});

app.use('/api/tasks', createTaskRoutes(taskController));

app.get('/', (req, res) => {
    res.json({
        name: 'Todo API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            health: '/health',
            ping: '/api/ping',
            tasks: '/api/tasks'
        }
    });
});

app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not Found',
        path: req.path,
        method: req.method
    });
});

app.use(errorHandler);

if (!config.isTest) {
    const PORT = config.port || 5000;
    const server = app.listen(PORT, '0.0.0.0', () => {
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`\nServer running on:`);
            console.log(`   - http://localhost:${PORT}`);
            console.log(`   - http://127.0.0.1:${PORT}`);
            console.log(`\nEnvironment: ${config.nodeEnv}`);
            console.log(`Test endpoints:`);
            console.log(`   - GET  http://localhost:${PORT}/health`);
            console.log(`   - GET  http://localhost:${PORT}/api/ping`);
            console.log(`\nServer is ready!\n`);
        });
        
    });
    
    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`\nPort ${PORT} is already in use!`);
            console.error(`   Please close the other application or change PORT in .env\n`);
        } else {
            console.error('Server error:', error);
        }
        process.exit(1);
    });
}

module.exports = app;