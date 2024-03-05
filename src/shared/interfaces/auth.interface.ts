import { IError } from './error.interface'
import { IUser } from './user.interface'

export interface IRegisterRequest {
	id?: number
	name: string
	email: string
	age: number
	password: string
	confirmPassword: string
	avatar: string
}

export interface ILoginFailed {
	errors: IError[]
	message: string
}

export interface IRegisterFailed {
	errors: IError[]
	message: string
}

export interface IRegisterResponse {
	user: IUser
	accessToken: string
}

export interface ILoginRequest {
	email: string
	password: string
}

export interface ILoginResponse {
	user: IUser
	accessToken: string
}

export interface IChangeUserRequest {
	userId: number
	userData: IUser
}

export interface IChangeUserResponse {
	user: IUser
	message: string
	errors?: IError[]
}

export interface IRefreshResponse {
	accessToken: string
}
