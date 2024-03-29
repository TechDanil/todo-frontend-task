import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './auth/auth.slice'
import TasksSlice from './tasks/tasks.slice'

export const store = configureStore({
	reducer: {
		auth: AuthSlice,
		tasks: TasksSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
