interface ICreateContainer {
	mountNode?: HTMLElement
	id: string
}

export const createContainer = ({
	mountNode = document.body,
	id,
}: ICreateContainer) => {
	if (!mountNode) return

	if (document.getElementById(id)) return

	const portalContainer = document.createElement('div')

	portalContainer.setAttribute('id', id)
	mountNode.appendChild(portalContainer)
}
