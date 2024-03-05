import { useEffect, useState } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { Link, useNavigate } from 'react-router-dom'
import { REGISTER_SCREEN, TASKS_SCREEN } from '../../../configs/screens.config'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { ILoginRequest } from '../../../shared/interfaces/auth.interface'
import {
	errorsSelector,
	isAuthSelector,
	isErrorSelector,
} from '../../../store/auth/auth.selectors'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
	formContainer: {
		width: '100%',
		padding: 20,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: 'gray',
	},
	input: {
		width: '100%',
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 10,
		marginTop: 10,
	},
	button: {
		width: '100%',
		height: 40,
		backgroundColor: 'blue',
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
	},
	footerText: {
		marginTop: 10,
		textAlign: 'center',
		color: 'gray',
	},
	signup: {
		color: 'red',
		fontSize: 13,
	},
	errorText: {
		textAlign: 'center',
		color: 'red',
		fontSize: 12,
	},
})

const LoginForm = () => {
	const [formData, setFormData] = useState<ILoginRequest>({
		email: '',
		password: '',
	})

	const navigate = useNavigate()

	const isAuth = useTypedSelector(isAuthSelector)
	const error = useTypedSelector(errorsSelector)
	const isError = useTypedSelector(isErrorSelector)
	const { login } = useActions()

	useEffect(() => {
		if (isAuth) {
			navigate(TASKS_SCREEN)
		}
	}, [isAuth, navigate])

	const handleChange = (name: string, value: string | number) => {
		setFormData(prevData => ({ ...prevData, [name]: value }))
	}

	const handleSubmit = async () => {
		try {
			await login(formData)

			setFormData({
				password: '',
				email: '',
			})
		} catch (error) {
			throw error
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.formContainer}>
				<TextInput
					style={styles.input}
					placeholder='Email'
					value={formData.email}
					onChangeText={text => handleChange('email', text)}
				/>
				{isError && (
					<Text style={styles.errorText}>{error?.errors[0]?.msg}</Text>
				)}
				<TextInput
					style={styles.input}
					placeholder='Password'
					value={formData.password}
					onChangeText={text => handleChange('password', text)}
				/>
				{isError && (
					<Text style={styles.errorText}>{error?.errors[1]?.msg}</Text>
				)}

				<TouchableOpacity style={styles.button} onPress={handleSubmit}>
					<Text style={styles.buttonText}>Log in</Text>
				</TouchableOpacity>

				{isError && <Text style={styles.errorText}>{error?.message}</Text>}

				<Text style={styles.footerText}>
					Don't have an account?
					<Link to={REGISTER_SCREEN} style={styles.signup}>
						Sign Up
					</Link>
				</Text>
			</View>
		</View>
	)
}

export default LoginForm
