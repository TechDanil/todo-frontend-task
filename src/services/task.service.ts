import { AxiosResponse } from 'axios'
import { instance } from '../api/api.interceptor'
import { ITask } from '../shared/interfaces/task.interface'

export const taskService = {
	createTask: async (
		userId: number,
		data: ITask
	): Promise<AxiosResponse<ITask>> => {
		return instance.post(`task/createTask/${userId}`, data)
	},

	removeTask: async (
		userId: number,
		taskId: number
	): Promise<AxiosResponse<void>> => {
		return instance.delete(`task/removeTask/${userId}/${taskId}`)
	},

	editTask: async (
		userId: number,
		taskId: number,
		data: ITask
	): Promise<AxiosResponse<ITask>> => {
		return instance.patch(`task/editTask/${userId}/${taskId}`, data)
	},

	getAllTasks: async (userId: number): Promise<AxiosResponse<ITask[]>> => {
		return instance.get(`task/getAllTasks/${userId}`)
	},

	viewTask: async (
		userId: number,
		taskId: number
	): Promise<AxiosResponse<ITask>> => {
		return instance.get(`task/viewTask/${userId}/${taskId}`)
	},
}
