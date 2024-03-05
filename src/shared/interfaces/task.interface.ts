export type TaskStatus = 'complete' | 'incomplete'
export type VisibilityStatus = 'private' | 'public'

export interface ITask {
	id?: number
	title: string
	userId?: number
	description: string
	completed: TaskStatus
	visibility: VisibilityStatus
}

export interface ITaskCreation {
	userId: number
	task: ITask
}

export interface ITaskEdit {
	userId: number
	taskId: number
	taskData: ITask
}

export interface ITaskView {
	userId: number
	taskId: number
}

export interface ITaskRemove {
	userId: number
	taskId: number
}
