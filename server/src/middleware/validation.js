const validateTaskCreation = (req, res, next) => {
	const { title } = req.body;
	
	if (!title) {
			return res.status(400).json({ 
					error: 'Title is required',
					details: 'Please provide a title for the task'
			});
	}
	
	if (typeof title !== 'string') {
			return res.status(400).json({ 
					error: 'Invalid title type',
					details: 'Title must be a string'
			});
	}
	
	if (title.trim().length === 0) {
			return res.status(400).json({ 
					error: 'Empty title',
					details: 'Title cannot be empty or only whitespace'
			});
	}
	
	if (title.length > 200) {
			return res.status(400).json({ 
					error: 'Title too long',
					details: 'Title cannot exceed 200 characters'
			});
	}
	
	req.body.title = title.trim();
	next();
};

const validateIdParam = (req, res, next) => {
	const id = parseInt(req.params.id);
	
	if (isNaN(id)) {
			return res.status(400).json({ 
					error: 'Invalid ID format',
					details: 'ID must be a number'
			});
	}
	
	req.params.id = id;
	next();
};

module.exports = {
	validateTaskCreation,
	validateIdParam
};