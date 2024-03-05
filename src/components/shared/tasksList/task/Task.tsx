import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import {
	ITask,
	TaskStatus,
	VisibilityStatus,
} from '../../../../shared/interfaces/task.interface'
import Modal from '../../../ui/modal/Modal'

interface ITaskProps {
	task: ITask
	handleRemove: (task: ITask) => void
	handleEditTask: (task: ITask) => void
}

const Task = ({ task, handleRemove, handleEditTask }: ITaskProps) => {
	const [openModal, setOpenModal] = useState(false)
	const [editedTask, setEditedTask] = useState<ITask>({ ...task })

	const handleOpenModal = () => {
		setOpenModal(true)
	}

	const handleCloseModal = () => {
		setOpenModal(false)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Title: {task.title}</Text>
			<Text style={styles.description}>Description: {task.description}</Text>
			<Text>Completed: {task.completed}</Text>
			<Text style={styles.visibility}>Visibility: {task.visibility}</Text>

			<TouchableOpacity
				style={styles.removeButton}
				onPress={() => handleRemove(task)}
			>
				<Text style={styles.removeButtonText}>Remove Task</Text>
			</TouchableOpacity>

			{openModal ? (
				<Modal handleModalClose={handleCloseModal}>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<TextInput
								style={styles.input}
								value={editedTask.title}
								onChangeText={text =>
									setEditedTask({ ...editedTask, title: text })
								}
								placeholder='Enter Title'
							/>
							<TextInput
								style={styles.input}
								value={editedTask.description}
								onChangeText={text =>
									setEditedTask({ ...editedTask, description: text })
								}
								placeholder='Enter Description'
							/>
							<View style={styles.pickerContainer}>
								<Picker
									selectedValue={editedTask.completed}
									onValueChange={(itemValue: TaskStatus) =>
										setEditedTask({ ...editedTask, completed: itemValue })
									}
								>
									<Picker.Item label='Incomplete' value='incomplete' />
									<Picker.Item label='Complete' value='complete' />
								</Picker>
								<Picker
									selectedValue={editedTask.visibility}
									onValueChange={(itemValue: VisibilityStatus) =>
										setEditedTask({ ...editedTask, visibility: itemValue })
									}
								>
									<Picker.Item label='Private' value='private' />
									<Picker.Item label='Public' value='public' />
								</Picker>
							</View>
							<View style={styles.btnContainer}>
								<Button
									title='Save Changes'
									onPress={() => {
										handleEditTask(editedTask)
										handleCloseModal()
									}}
								/>
								<Button title='Cancel' onPress={handleCloseModal} />
							</View>
						</View>
					</View>
				</Modal>
			) : null}

			<TouchableOpacity style={styles.editButton} onPress={handleOpenModal}>
				<Text style={styles.editButtonText}>Edit Task</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: 'black',
		padding: 10,
		marginBottom: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	description: {
		fontSize: 16,
	},
	completed: {
		fontSize: 16,
		fontStyle: 'italic',
	},
	visibility: {
		fontSize: 16,
		color: 'blue',
	},
	removeButton: {
		marginTop: 10,
		backgroundColor: 'red',
		padding: 5,
		borderRadius: 5,
		alignItems: 'center',
	},
	removeButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
	editButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
	editButton: {
		marginTop: 10,
		backgroundColor: 'blue',
		padding: 5,
		borderRadius: 5,
		alignItems: 'center',
	},
	btnContainer: {
		display: 'flex',
		flexDirection: 'column',
		rowGap: 10,
		justifyContent: 'space-between',
		marginTop: 10,
	},
	pickerContainer: {
		display: 'flex',
		flexDirection: 'column',
		rowGap: 10,
		justifyContent: 'space-between',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		elevation: 5,
	},
	input: {
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	},
})

export default Task
