import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services/auth.service'
import {
	ILoginRequest,
	ILoginResponse,
	IRegisterRequest,
	IRegisterResponse,
} from '../../shared/interfaces/auth.interface'
import { IUser } from '../../shared/interfaces/user.interface'
import { removeToken, saveToken } from '../../utils/token/token'

export const register = createAsyncThunk<IRegisterResponse, IRegisterRequest>(
	'auth/register',
	async (data, { rejectWithValue }) => {
		try {
			const response = await authService.register(data)

			if (response.data) {
				const token = response.data.accessToken
				saveToken(token)
			}

			const createdUser = {
				...data,
				id: response.data.user.id,
				age: data.age,
				avatar: data.avatar,
			}

			localStorage.setItem('user', JSON.stringify(createdUser))
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const login = createAsyncThunk<ILoginResponse, ILoginRequest>(
	'auth/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const response = await authService.login({
				email,
				password,
			})

			if (response.data) {
				const token = response.data.accessToken
				saveToken(token)
			}

			const userData: IUser = JSON.parse(localStorage.getItem('user') as string)

			localStorage.setItem(
				'user',
				JSON.stringify({
					id: response.data.user.id,
					password: response.data.user.password,
					email: response.data.user.email,
					name: response.data.user.name,
					avatar: userData.avatar,
					age: userData.age,
				})
			)

			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const logout = createAsyncThunk<void, void>(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			const response = await authService.logout()

			if (response.data) {
				removeToken()
			}
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const updateUserInfo = createAsyncThunk(
	'auth/user-info',
	async (
		{ userId, updatedUserInfo }: { userId: number; updatedUserInfo: any },
		{ rejectWithValue }
	) => {
		try {
			const response = await authService.updateUserInfo(userId, updatedUserInfo)
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)
