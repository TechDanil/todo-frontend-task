import { AxiosError, AxiosResponse } from 'axios'
import { instance } from '../api/api.interceptor'
import {
	ILoginRequest,
	ILoginResponse,
	IRefreshResponse,
	IRegisterRequest,
	IRegisterResponse,
} from '../shared/interfaces/auth.interface'
import { IUser } from '../shared/interfaces/user.interface'
import { handleApiError } from '../utils/handleApiError/handleApiError'

export const authService = {
	register: async ({
		name,
		email,
		password,
		confirmPassword,
		age,
		avatar,
	}: IRegisterRequest): Promise<AxiosResponse<IRegisterResponse>> => {
		try {
			const response = instance.post<IRegisterResponse>(
				`auth/register`,
				{ name, email, password, confirmPassword, age, avatar },
				{ withCredentials: true }
			)

			return response
		} catch (error) {
			throw handleApiError(error as AxiosError)
		}
	},

	login: async ({
		email,
		password,
	}: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> => {
		try {
			const response = instance.post<ILoginResponse>(`auth/login`, {
				email,
				password,
			})

			return response
		} catch (error) {
			throw handleApiError(error as AxiosError)
		}
	},

	logout: async (): Promise<AxiosResponse> => {
		return instance.post<void>('auth/logout')
	},

	refresh: async (): Promise<AxiosResponse<IRefreshResponse>> => {
		return instance.get<IRefreshResponse>(`auth/refresh`, {
			withCredentials: true,
		})
	},

	updateUserInfo: async (
		userId: number,
		updatedUserInfo: any
	): Promise<AxiosResponse<IUser>> => {
		try {
			const response = await instance.patch<IUser>(
				`auth/user-info/${userId}`,
				updatedUserInfo,
				{ withCredentials: true }
			)
			return response
		} catch (error) {
			throw handleApiError(error as AxiosError)
		}
	},
}
