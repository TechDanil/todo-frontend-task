import { createAsyncThunk } from '@reduxjs/toolkit'
import { taskService } from '../../services/task.service'
import {
	ITask,
	ITaskCreation,
	ITaskEdit,
	ITaskRemove,
	ITaskView,
} from '../../shared/interfaces/task.interface'

export const createTask = createAsyncThunk<ITask, ITaskCreation>(
	'task/createTask',
	async ({ userId, task }, { rejectWithValue }) => {
		try {
			const response = await taskService.createTask(userId, task)
			const tasks: ITask[] = JSON.parse(
				localStorage.getItem(`tasks-${userId}`) || '[]'
			)
			const updatedTask = { ...task, id: response.data.id, userId: userId }
			tasks.push(updatedTask)
			localStorage.setItem(`tasks-${userId}`, JSON.stringify(tasks))
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const removeTask = createAsyncThunk<void, ITaskRemove>(
	'task/removeTask',
	async ({ userId, taskId }, { rejectWithValue }) => {
		try {
			await taskService.removeTask(userId, taskId)
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const fetchAllTasks = createAsyncThunk<ITask[], number>(
	'task/fetchAllTasks',
	async (userId, { rejectWithValue }) => {
		try {
			const response = await taskService.getAllTasks(userId)
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const editTask = createAsyncThunk<ITask, ITaskEdit>(
	'task/editTask',
	async ({ userId, taskId, taskData }, { rejectWithValue }) => {
		try {
			const response = await taskService.editTask(userId, taskId, taskData)
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const viewTask = createAsyncThunk<ITask, ITaskView>(
	'task/viewTask',
	async ({ userId, taskId }, { rejectWithValue }) => {
		try {
			const response = await taskService.viewTask(userId, taskId)
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)
