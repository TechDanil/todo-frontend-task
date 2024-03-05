import { ReactNode } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { LOGIN_SCREEN } from '../../configs/screens.config'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { userSelector } from '../../store/auth/auth.selectors'

interface IProtectedRouteProps {
	children: ReactNode
	pathName: string
}

const ProtectedRoute = ({
	children,
	pathName,
	...rest
}: IProtectedRouteProps) => {
	const user = useTypedSelector(userSelector)

	if (!user) {
		return <Navigate to={LOGIN_SCREEN} replace />
	}

	return <Route {...rest} path={pathName} element={children} />
}

export default ProtectedRoute
