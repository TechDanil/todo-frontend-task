import React from 'react'
import { Button } from 'react-native'
import { useNavigate } from 'react-router-dom'
import { LOGIN_SCREEN } from '../../../configs/screens.config'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { isAuthSelector } from '../../../store/auth/auth.selectors'

const Logout = () => {
	const { logout } = useActions()
	const isAuth = useTypedSelector(isAuthSelector)
	const navigate = useNavigate()

	const handleLogout = async () => {
		try {
			await logout()
			navigate(LOGIN_SCREEN)
		} catch (error) {
			throw error
		}
	}

	return <Button title='Logout ?' onPress={handleLogout} />
}

export default Logout
