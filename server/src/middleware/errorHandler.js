const errorHandler = (err, req, res, next) => {
	console.error('Error:', err.message);
	console.error('Stack:', err.stack);
	
	let statusCode = 500;
	let errorMessage = 'Internal server error';
	
	if (err.message === 'Task not found') {
			statusCode = 404;
			errorMessage = err.message;
	} else if (err.message.includes('Title')) {
			statusCode = 400;
			errorMessage = err.message;
	}
	
	res.status(statusCode).json({
			error: errorMessage,
			timestamp: new Date().toISOString(),
			path: req.path
	});
};

module.exports = errorHandler;