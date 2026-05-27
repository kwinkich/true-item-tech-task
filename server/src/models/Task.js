class Task {
	constructor(title) {
			this.id = null;
			this.title = title;
			this.completed = false;
			this.createdAt = new Date();
			this.updatedAt = new Date();
	}

	static validate(taskData) {
			const errors = [];
			
			if (!taskData.title || typeof taskData.title !== 'string') {
					errors.push('Title is required and must be a string');
			} else if (taskData.title.trim().length === 0) {
					errors.push('Title cannot be empty');
			} else if (taskData.title.length > 200) {
					errors.push('Title cannot exceed 200 characters');
			}
			
			return {
					isValid: errors.length === 0,
					errors
			};
	}

	update(data) {
			if (data.title !== undefined) {
					this.title = data.title;
			}
			if (data.completed !== undefined) {
					this.completed = data.completed;
			}
			this.updatedAt = new Date();
			return this;
	}

	toJSON() {
			return {
					id: this.id,
					title: this.title,
					completed: this.completed,
					createdAt: this.createdAt,
					updatedAt: this.updatedAt
			};
	}
}

module.exports = Task;