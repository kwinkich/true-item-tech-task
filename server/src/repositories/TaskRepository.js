
class TaskRepository {
	constructor() {
			this.tasks = new Map();
	}

	save(task) {
			this.tasks.set(task.id, task);
			return task;
	}

	findById(id) {
			return this.tasks.get(id) || null;
	}

	findAll() {
			return Array.from(this.tasks.values());
	}

	update(id, task) {
			if (!this.tasks.has(id)) {
					return null;
			}
			this.tasks.set(id, task);
			return task;
	}

	delete(id) {
			return this.tasks.delete(id);
	}

	clear() {
			this.tasks.clear();
	}

	count() {
			return this.tasks.size;
	}
}

module.exports = TaskRepository;