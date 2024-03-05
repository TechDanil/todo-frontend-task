import { createSlice } from '@reduxjs/toolkit'
import { ITask } from '../../shared/interfaces/task.interface'
import {
	createTask,
	editTask,
	fetchAllTasks,
	removeTask,
} from './tasks.actions'

interface IInitialState {
	tasks: ITask[]
	error: string | null
	isLoading: boolean
	isError: boolean
}

const initialState: IInitialState = {
	tasks: [],
	error: null,
	isLoading: false,
	isError: false,
}

export const TasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(createTask.pending, state => {
				state.isLoading = true
				state.isError = false
			})
			.addCase(createTask.fulfilled, (state, action) => {
				state.tasks.push(action.payload)
				state.isLoading = false
				state.isError = false
			})
			.addCase(createTask.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
			.addCase(fetchAllTasks.pending, state => {
				state.isLoading = true
				state.isError = false
			})
			.addCase(fetchAllTasks.fulfilled, (state, action) => {
				state.tasks = action.payload
				state.isLoading = false
				state.isError = false
			})
			.addCase(fetchAllTasks.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
			.addCase(editTask.pending, state => {
				state.isLoading = true
				state.isError = false
			})
			.addCase(editTask.fulfilled, (state, action) => {
				const updatedTask = action.payload
				const index = state.tasks.findIndex(task => task.id === updatedTask.id)
				if (index !== -1) {
					state.tasks[index] = updatedTask
				}
				state.isLoading = false
				state.isError = false
			})
			.addCase(editTask.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
			.addCase(removeTask.pending, state => {
				state.isLoading = true
				state.isError = false
			})
			.addCase(removeTask.fulfilled, (state, action) => {
				const taskIdToRemove = action.payload
				state.tasks = state.tasks.filter(task => task.id !== taskIdToRemove)
				state.isLoading = false
				state.isError = false
			})
			.addCase(removeTask.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export default TasksSlice.reducer
