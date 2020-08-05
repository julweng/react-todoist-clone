import React, { createContext, useContext, useState } from "react"
import { node } from "prop-types"

export const SelectedProjectContext = createContext()

export const SelectedProjectProvider = ({ children }) => {
	// if no project is selected, default is INBOX
	const [selectedProject, setSelectedProject] = useState("INBOX")

	return (
		<SelectedProjectContext.Provider
			value={{ selectedProject, setSelectedProject }}
		>
			{children}
		</SelectedProjectContext.Provider>
	)
}

export const useSelectedProjectValue = () => useContext(SelectedProjectContext)

SelectedProjectProvider.propTypes = {
	children: node.isRequired
}
