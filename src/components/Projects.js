import React, { useState } from "react"
import { useSelectedProjectValue, useProjectsValue } from "context"

export const Projects = ({ activeValue = null }) => {
	const [active, setActive] = useState(activeValue)
	const { setSelectedProject } = useSelectedProjectValue()
	const { projects } = useProjectsValue()

	const className = (projectId) =>
		active === projectId ? "active sidebar__project" : "sidebar__project"

	const handleClick = (projectId) => {
    console.log("clicked")
		setActive(projectId)
		setSelectedProject(projectId)
	}

	return (
		projects &&
		projects.map(({ projectId, docId }) => (
			<li
				key={projectId}
				data-doc-id={docId}
				data-testid="project-action"
				className={className(projectId)}
			>
				<div onClick={() => handleClick(projectId)}>I am a project</div>
			</li>
		))
	)
}
