import { AxiosError } from 'axios'

export interface IErrorResponse {
	message: string
	errors: string[]
}

export const handleApiError = (error: AxiosError): IErrorResponse | null => {
	if (error.response?.data) {
		const { message, errors } = error.response.data as IErrorResponse
		return { message, errors }
	}

	return null
}
