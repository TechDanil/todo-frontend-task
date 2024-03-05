import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import {
	BackHandler,
	Keyboard,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { MODAL_CONTAINER_ID } from '../../../configs/index.config'
import { createContainer } from '../../../utils/createContainer/createContainer'
import Portal from '../../shared/portal/Portal'

interface IModalProps {
	children: ReactNode
	handleModalClose?: () => void
}

const Modal = ({ children, handleModalClose }: IModalProps) => {
	const [isMounted, setMounted] = useState(false)

	const rootRef = useRef<View>(null)

	useEffect(() => {
		createContainer({ id: MODAL_CONTAINER_ID })
		setMounted(true)

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => {
				handleModalClose?.()
				return true
			}
		)

		const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
			handleModalClose?.()
		})

		return () => {
			backHandler.remove()
			keyboardListener.remove()
		}
	}, [])

	const onOverlayPress = () => {
		handleModalClose?.()
	}

	const onCloseHandler = useCallback(() => {
		handleModalClose?.()
	}, [handleModalClose])

	return isMounted ? (
		<Portal id={MODAL_CONTAINER_ID}>
			<TouchableWithoutFeedback onPress={onOverlayPress}>
				<View style={styles.overlay}>
					<TouchableWithoutFeedback>
						<View ref={rootRef}>
							<TouchableWithoutFeedback onPress={onCloseHandler}>
								<View style={styles.closeButton}>
									<Text style={styles.closeButtonText}>X</Text>
								</View>
							</TouchableWithoutFeedback>
							{children}
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Portal>
	) : null
}

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	closeButton: {
		position: 'absolute',
		top: -2,
		right: -1,
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		zIndex: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	closeButtonText: {
		fontSize: 20,
		color: '#333',
	},
})

export default Modal
