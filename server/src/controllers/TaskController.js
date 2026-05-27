class TaskController { 
	constructor(taskService) {
		this.taskService = taskService;
	} 


	getAllTasks = (req, res, next) => {
		try {
			const tasks = this.taskService.getAllTasks();
			res.json({
				success: true,
				count: tasks.length,
				data: tasks,
			})
		} catch (error) { 
			next(error)
		}
	}


	getTaskById = (req, res, next) => {
		try {
			const taks = this.taskService.getTaskById(req.params.id);
			res.json({
				success: true,
				data: task,
			})
		} catch (error) { 
			next(error)
		}
	}


	createTask = (req, res, next) => {
		try {
				const task = this.taskService.createTask(req.body.title);
				res.status(201).json({
						success: true,
						data: task
				});
		} catch (error) {
				next(error);
		}
};

	updateTask = (req, res, next) => {
		try {
			const {title, completed} = req.body;
			const updateData = {};

			if (title !== undefined) updateData.title = title;
			if (completed !== undefined) updateData.completed = completed;

			const task = this.taskService.updateTask(req.params.id, updateData);

			res.json({
				success: true,
				data: task
			})
		} catch (error) {
			next(error);
		}
	}

	deleteTask = (req, res, next) => {
		try {
			this.taskService.deleteTask(req.params.id);
			res.json({
				success: true,
			});
		} catch (error) {
			next(error);
		}
	}

	toggleTaskStatus = (req, res, next) => {
		try {
			const task = this.taskService.toggleTaskStatus(req.params.id);
			res.json({
				success: true,
				data: task
			})
		} catch (error) {
			next(error);
		}
	}

	deleteCompletedTasks = (req, res, next) => {
		try {
			const deletedCount = this.taskService.deleteCompletedTasks();

			res.json({
				success: true,
				message: `Deleted ${deletedCount} completed tasks`,
				deletedCount,
			})
		} catch (error) {
			next(error);
		}
	}
}

module.exports = TaskController;