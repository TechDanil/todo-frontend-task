import { createSlice } from '@reduxjs/toolkit'
import {
	ILoginFailed,
	IRegisterFailed,
} from '../../shared/interfaces/auth.interface'
import { IUser } from '../../shared/interfaces/user.interface'
import { login, logout, register, updateUserInfo } from './auth.actions'

interface IInitialState {
	user: IUser | null
	error: IRegisterFailed | ILoginFailed | null
	isLoading: boolean
	isError: boolean
	isAuth: boolean
}

const storedUser = localStorage.getItem('user')
const initialState: IInitialState = {
	user: storedUser ? JSON.parse(storedUser) : null,
	error: null,
	isLoading: false,
	isError: false,
	isAuth: false,
}

const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(register.pending, state => {
			state.isLoading = true
			state.isError = false
		})
		builder.addCase(register.fulfilled, (state, action) => {
			state.user = action.payload.user
			state.error = null
			state.isLoading = false
			state.isError = false
			state.isAuth = true
		})
		builder.addCase(register.rejected, (state, action) => {
			state.user = null
			state.error = action.payload as IRegisterFailed
			state.isLoading = false
			state.isError = true
			state.isAuth = false
		})
		builder.addCase(login.fulfilled, (state, action) => {
			state.user = action.payload.user
			state.error = null
			state.isLoading = false
			state.isError = false
			state.isAuth = true
		})
		builder.addCase(login.rejected, (state, action) => {
			state.user = null
			state.error = action.payload as ILoginFailed
			state.isLoading = false
			state.isError = true
			state.isAuth = false
		})
		builder.addCase(logout.fulfilled, (state, action) => {
			state.user = null
			state.isLoading = false
			state.isError = false
			state.isAuth = false
		})
		builder.addCase(updateUserInfo.pending, state => {
			state.isLoading = true
			state.isError = false
		})
		builder.addCase(updateUserInfo.fulfilled, (state, action) => {
			state.user = action.payload
			state.error = null
			state.isLoading = false
			state.isError = false
			state.isAuth = true
		})
		builder.addCase(updateUserInfo.rejected, (state, action) => {
			state.user = null
			state.error = action.payload as IRegisterFailed
			state.isLoading = false
			state.isError = true
			state.isAuth = false
		})
	},
})

export default AuthSlice.reducer
