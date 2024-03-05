import * as AuthActions from './auth/auth.actions'
import * as TasksActions from './tasks/tasks.actions'

export const rootActions = {
	...AuthActions,
	...TasksActions,
}
