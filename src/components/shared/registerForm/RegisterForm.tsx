import { useEffect, useState } from 'react'
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_SCREEN, TASKS_SCREEN } from '../../../configs/screens.config'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { IRegisterRequest } from '../../../shared/interfaces/auth.interface'
import {
	errorsSelector,
	isAuthSelector,
	isErrorSelector,
} from '../../../store/auth/auth.selectors'
import { handleAvatarSelection } from '../../../utils/handleAvatarSelection/handleAvatarSelection'

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
	avatarContainer: {
		margin: 'auto',
		marginBottom: 20,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
	},
	input: {
		width: '100%',
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginTop: 10,
		marginBottom: 10,
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
	login: {
		color: 'red',
		fontSize: 13,
	},
	errorText: {
		textAlign: 'center',
		color: 'red',
		fontSize: 12,
	},
})

const RegisterForm = () => {
	const [formData, setFormData] = useState<IRegisterRequest>({
		name: '',
		password: '',
		confirmPassword: '',
		email: '',
		age: 0,
		avatar: '',
	})

	const navigate = useNavigate()
	const error = useTypedSelector(errorsSelector)
	const isError = useTypedSelector(isErrorSelector)
	const isAuth = useTypedSelector(isAuthSelector)

	const { register } = useActions()

	const handleChange = (name: string, value: string | number) => {
		setFormData(prevData => ({ ...prevData, [name]: value }))
	}

	// const handleAvatarSelection = () => {
	// 	const options = {
	// 		mediaType: 'photo' as MediaType,
	// 		quality: 1 as PhotoQuality,
	// 	}

	// 	launchImageLibrary(options, (response: ImagePickerResponse) => {
	// 		if (!response.didCancel) {
	// 			const uri = response.assets?.[0]?.uri
	// 			if (uri) {
	// 				setFormData(prevData => ({ ...prevData, avatar: uri }))
	// 			}
	// 		}
	// 	})
	// }

	useEffect(() => {
		if (!isError && isAuth) {
			navigate(TASKS_SCREEN)
		}
	}, [isError, isAuth, navigate])

	const handleSubmit = async () => {
		try {
			await register(formData)
			setFormData({
				name: '',
				password: '',
				confirmPassword: '',
				email: '',
				age: 0,
				avatar: '',
			})
		} catch (error) {
			throw error
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.formContainer}>
				<TouchableOpacity
					style={styles.avatarContainer}
					onPress={() => handleAvatarSelection<IRegisterRequest>(setFormData)}
				>
					{formData.avatar ? (
						<Image source={{ uri: formData.avatar }} style={styles.avatar} />
					) : (
						<Text>Select Avatar</Text>
					)}
				</TouchableOpacity>
				{isError && (
					<Text style={styles.errorText}>{error?.errors[1]?.msg}</Text>
				)}
				<TextInput
					style={styles.input}
					placeholder='Name'
					value={formData.name}
					onChangeText={text => handleChange('name', text)}
				/>
				{isError && (
					<Text style={styles.errorText}>{error?.errors[0]?.msg}</Text>
				)}
				<TextInput
					style={styles.input}
					placeholder='Email'
					value={formData.email}
					onChangeText={text => handleChange('email', text)}
				/>
				{isError && (
					<Text style={styles.errorText}>
						{error?.errors[2]?.msg || error?.errors[3]?.msg}
					</Text>
				)}
				<TextInput
					style={styles.input}
					placeholder='Password'
					value={formData.password}
					onChangeText={text => handleChange('password', text)}
				/>
				{isError && (
					<Text style={styles.errorText}>
						{error?.errors[4]?.msg || error?.errors[5]?.msg}
					</Text>
				)}
				<TextInput
					style={styles.input}
					placeholder='Confirm password'
					value={formData.confirmPassword}
					onChangeText={text => handleChange('confirmPassword', text)}
				/>
				{isError && (
					<Text style={styles.errorText}>{error?.errors[6]?.msg}</Text>
				)}
				<TextInput
					style={styles.input}
					placeholder='Age'
					value={formData.age != 0 ? formData.age.toString() : ''}
					onChangeText={text => handleChange('age', text)}
				/>
				{isError && (
					<Text style={styles.errorText}>{error?.errors[7]?.msg}</Text>
				)}
				<TouchableOpacity style={styles.button} onPress={handleSubmit}>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>

				{isError && <Text style={styles.errorText}>{error?.message}</Text>}

				<Text style={styles.footerText}>
					Already have an account?
					<Link to={LOGIN_SCREEN} style={styles.login}>
						Log In
					</Link>
				</Text>
			</View>
		</View>
	)
}

export default RegisterForm
