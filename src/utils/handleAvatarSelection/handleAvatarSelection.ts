import { Dispatch, SetStateAction } from 'react'
import {
	ImagePickerResponse,
	MediaType,
	PhotoQuality,
	launchImageLibrary,
} from 'react-native-image-picker'

type SetFormData<T> = Dispatch<SetStateAction<T>>

export const handleAvatarSelection = <T>(setFormData: SetFormData<T>) => {
	const options = {
		mediaType: 'photo' as MediaType,
		quality: 1 as PhotoQuality,
	}

	launchImageLibrary(options, (response: ImagePickerResponse) => {
		if (!response.didCancel) {
			const uri = response.assets?.[0]?.uri
			if (uri) {
				setFormData(prevData => ({ ...prevData, avatar: uri }))
			}
		}
	})
}
