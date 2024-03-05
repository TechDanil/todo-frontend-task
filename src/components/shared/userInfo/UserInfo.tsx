import {
	Button,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { IUser } from '../../../shared/interfaces/user.interface'
import { handleAvatarSelection } from '../../../utils/handleAvatarSelection/handleAvatarSelection'

const styles = StyleSheet.create({
	wrapper: {},
	fieldLabel: {
		marginTop: 10,
		marginBottom: 5,
		fontSize: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
	},
	avatarContainer: {
		margin: 'auto',
		marginBottom: 20,
	},
	btnContainer: {
		display: 'flex',
		rowGap: 10,
	},
})

interface props {
	userData: IUser
	setUserData: React.Dispatch<React.SetStateAction<IUser>>
	handleUserInfoChange: (updatedUserInfo: IUser) => void
	handleCloseModal: () => void
}

const UserInfo = ({
	userData,
	setUserData,
	handleUserInfoChange,
	handleCloseModal,
}: props) => {
	const handleChange = (field: keyof typeof userData, value: string) => {
		setUserData(prevData => ({ ...prevData, [field]: value }))
	}

	return (
		<View style={styles.wrapper}>
			<Text style={styles.fieldLabel}>Avatar</Text>
			<TouchableOpacity
				style={styles.avatarContainer}
				onPress={() => handleAvatarSelection<IUser>(setUserData)}
			>
				{userData.avatar ? (
					<Image source={{ uri: userData.avatar }} style={styles.avatar} />
				) : (
					<Text>Select Avatar</Text>
				)}
			</TouchableOpacity>
			<Text style={styles.fieldLabel}>Name</Text>
			<TextInput
				style={styles.input}
				value={userData.name}
				onChangeText={text => handleChange('name', text)}
			/>
			<Text style={styles.fieldLabel}>Email</Text>
			<TextInput
				style={styles.input}
				value={userData.email}
				onChangeText={text => handleChange('email', text)}
			/>
			<Text style={styles.fieldLabel}>Password</Text>
			<TextInput
				style={styles.input}
				value={userData.password}
				secureTextEntry={true}
				onChangeText={text => handleChange('password', text)}
			/>
			<Text style={styles.fieldLabel}>Confirm password</Text>
			<TextInput
				style={styles.input}
				value={userData.confirmPassword}
				secureTextEntry={true}
				onChangeText={text => handleChange('confirmPassword', text)}
			/>
			<Text style={styles.fieldLabel}>Age</Text>
			<TextInput
				style={styles.input}
				value={String(userData.age)}
				onChangeText={text => handleChange('age', text)}
			/>

			<View style={styles.btnContainer}>
				<Button
					title='Save Changes'
					onPress={() => {
						if (userData) {
							handleUserInfoChange(userData)
							handleCloseModal()
						}
					}}
				/>
				<Button title='Cancel' onPress={handleCloseModal} />
			</View>
		</View>
	)
}

export default UserInfo
