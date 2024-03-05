import { useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useActions } from '../../../hooks/useActions'
import { IUser } from '../../../shared/interfaces/user.interface'
import Logout from '../../shared/logout/Logout'
import TaskForm from '../../shared/taskForm/TaskForm'
import TasksList from '../../shared/tasksList/TasksList'
import UserInfo from '../../shared/userInfo/UserInfo'
import Modal from '../../ui/modal/Modal'

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
	},
	modalButton: {
		marginTop: 10,
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
	btnContainer: {
		display: 'flex',
		flexDirection: 'column',
		rowGap: 10,
		justifyContent: 'space-between',
		marginTop: 10,
	},
	btnWrapper: {
		display: 'flex',
		rowGap: 10,
	},
})

const Tasks = () => {
	const [showUserInfo, setShowUserInfo] = useState(false)
	const user = JSON.parse(localStorage.getItem('user') as string)
	const [userData, setUserData] = useState<IUser>(user as IUser)

	const { updateUserInfo } = useActions()

	const handleUserInfoChange = async (updatedUserInfo: IUser) => {
		try {
			await updateUserInfo({
				userId: updatedUserInfo?.id as number,
				updatedUserInfo,
			})

			setUserData(updatedUserInfo)
		} catch (error) {
			throw error
		}
	}

	const handleOpenModal = () => {
		setShowUserInfo(true)
	}

	const handleCloseModal = () => {
		setShowUserInfo(false)
	}

	return (
		<View style={styles.wrapper}>
			<View>
				<TaskForm />
				<TasksList />
				<View style={styles.btnWrapper}>
					<Button title='Show User Info' onPress={handleOpenModal} />
					<Logout />
				</View>
			</View>
			<View>
				{showUserInfo && (
					<Modal handleModalClose={handleCloseModal}>
						<View style={styles.modalContainer}>
							<View style={styles.modalContent}>
								<UserInfo
									userData={userData}
									setUserData={setUserData}
									handleUserInfoChange={handleUserInfoChange}
									handleCloseModal={handleCloseModal}
								/>
							</View>
						</View>
					</Modal>
				)}
			</View>
		</View>
	)
}

export default Tasks
