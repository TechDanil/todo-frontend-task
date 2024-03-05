import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { PORTAL_ERROR_MSG } from '../../../configs/index.config'

interface IPortalProps {
	id: string
	children: ReactNode
}

const Portal = ({ id, children }: IPortalProps) => {
	const [container, setContainer] = useState<HTMLElement>()

	useEffect(() => {
		if (id) {
			const portalContainer = document.getElementById(id)

			if (!portalContainer) {
				throw new Error(PORTAL_ERROR_MSG)
			}

			setContainer(portalContainer)
		}
	}, [id])

	return container ? createPortal(children, container) : null
}

export default Portal
