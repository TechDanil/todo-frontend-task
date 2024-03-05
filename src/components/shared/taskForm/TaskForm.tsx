import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { ITask } from '../../../shared/interfaces/task.interface'
import {
	errorsSelector,
	isErrorSelector,
	userSelector,
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
	errorText: {
		textAlign: 'center',
		color: 'red',
		fontSize: 12,
	},
})

const TaskForm = () => {
	const [taskData, setTaskData] = useState<ITask>({
		title: '',
		description: '',
		completed: 'incomplete',
		visibility: 'private',
	})

	const user = useTypedSelector(userSelector)
	const error = useTypedSelector(errorsSelector)
	const isError = useTypedSelector(isErrorSelector)

	const { createTask } = useActions()

	const handleChange = (name: string, value: string | number) => {
		setTaskData(prevData => ({ ...prevData, [name]: value }))
	}

	const handleSubmit = async () => {
		try {
			await createTask({ userId: user?.id as number, task: taskData })
			setTaskData({
				title: '',
				description: '',
				completed: 'incomplete',
				visibility: 'private',
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
					placeholder='Title'
					value={taskData.title}
					onChangeText={text => handleChange('title', text)}
				/>
				{isError && (
					<Text style={styles.errorText}>{error?.errors[0]?.msg}</Text>
				)}
				<TextInput
					style={styles.input}
					placeholder='Description'
					value={taskData.description}
					onChangeText={text => handleChange('description', text)}
				/>
				{isError && (
					<Text style={styles.errorText}>{error?.errors[1]?.msg}</Text>
				)}

				<Picker
					style={styles.input}
					selectedValue={taskData.completed}
					onValueChange={(itemValue: string) =>
						handleChange('completed', itemValue)
					}
				>
					<Picker.Item label='Incomplete' value='incomplete' />
					<Picker.Item label='Complete' value='complete' />
				</Picker>

				<Picker
					style={styles.input}
					selectedValue={taskData.visibility}
					onValueChange={(itemValue: string) =>
						handleChange('visibility', itemValue)
					}
				>
					<Picker.Item label='Private' value='private' />
					<Picker.Item label='Public' value='public' />
				</Picker>

				<TouchableOpacity style={styles.button} onPress={handleSubmit}>
					<Text style={styles.buttonText}>Create</Text>
				</TouchableOpacity>

				{isError && <Text style={styles.errorText}>{error?.message}</Text>}
			</View>
		</View>
	)
}

export default TaskForm
