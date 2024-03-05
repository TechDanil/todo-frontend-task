import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import AppRouter from './src/router/AppRouter'
import { store } from './src/store'

const App = () => {
	return (
		<Provider store={store}>
			<ScrollView contentContainerStyle={styles.container}>
				<AppRouter />
			</ScrollView>
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: '30px',
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default App
