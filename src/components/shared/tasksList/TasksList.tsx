import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { ITask } from '../../../shared/interfaces/task.interface'
import { userSelector } from '../../../store/auth/auth.selectors'
import { tasksSelector } from '../../../store/tasks/tasks.selectors'
import Task from './task/Task'

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
})

const TasksList = () => {
	const tasks = useTypedSelector(tasksSelector)
	const user = useTypedSelector(userSelector)
	const [storedTasks, setStoredTasks] = useState<ITask[]>([])

	const { removeTask, editTask } = useActions()

	useEffect(() => {
		const storedTodos = JSON.parse(
			localStorage.getItem(`tasks-${user?.id}`) as string
		)
		if (storedTodos) {
			setStoredTasks(storedTodos)
		}
	}, [tasks])

	const handleRemoveTask = async (task: ITask) => {
		try {
			await removeTask({
				userId: task.userId as number,
				taskId: task.id as number,
			})

			const tasks: ITask[] = JSON.parse(
				localStorage.getItem(`tasks-${task.userId}`) || '[]'
			)

			const updatedTasks = tasks.filter(t => t.id !== task.id)
			localStorage.setItem(`tasks-${task.userId}`, JSON.stringify(updatedTasks))
			setStoredTasks(updatedTasks)
		} catch (error) {
			throw error
		}
	}

	const handleEditTask = async (task: ITask) => {
		try {
			await editTask({
				userId: task.userId as number,
				taskId: task.id as number,
				taskData: task,
			})
			const index = storedTasks.findIndex(t => t.id === task.id)

			const updatedTasks = [...storedTasks]
			updatedTasks[index] = task
			setStoredTasks(updatedTasks)
			localStorage.setItem(`tasks-${task.userId}`, JSON.stringify(updatedTasks))
		} catch (error) {
			throw error
		}
	}

	return (
		<View style={styles.container}>
			{storedTasks.map(task => (
				<Task
					key={task.id}
					task={task}
					handleRemove={handleRemoveTask}
					handleEditTask={handleEditTask}
				/>
			))}
		</View>
	)
}

export default TasksList
