import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom'
import Login from '../components/screens/login/Login'
import Register from '../components/screens/register/Register'
import Tasks from '../components/screens/tasks/Tasks'
import UserInfo from '../components/shared/userInfo/UserInfo'
import {
	LOGIN_SCREEN,
	MAIN_SCREEN,
	REGISTER_SCREEN,
	TASKS_SCREEN,
	USER_INFO_SCREEN,
} from '../configs/screens.config'

const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route
					path={`${MAIN_SCREEN}`}
					element={<Navigate to={LOGIN_SCREEN} />}
				/>
				<Route path={`${LOGIN_SCREEN}`} element={<Login />} />
				<Route path={`${REGISTER_SCREEN}`} element={<Register />} />
				<Route path={`${TASKS_SCREEN}`} element={<Tasks />} />
				<Route path={`${USER_INFO_SCREEN}`} element={<UserInfo />} />
			</Routes>
		</Router>
	)
}

export default AppRouter
