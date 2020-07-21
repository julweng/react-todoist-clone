import React, { useState } from "react"
import { string } from "prop-types"
import { useSelectedProjectValue, useProjectsValue } from "context"
import { IndividualProject } from "."

export const Projects = ({ activeValue = null }) => {
	const [active, setActive] = useState(activeValue)
	const { setSelectedProject } = useSelectedProjectValue()
	const { projects } = useProjectsValue()

	const className = projectId =>
		active === projectId ? "active sidebar__project" : "sidebar__project"

	const handleClick = projectId => {
		setActive(projectId)
		setSelectedProject(projectId)
	}

	return (
		projects &&
		projects.map(project => (
			<li
				key={project.docId}
				data-doc-id={project.docId}
				data-testid="project-action-parent"
				className={className(project.projectId)}
			>
				<div
					role="button"
					data-testid="project-action"
					tabIndex={0}
					aria-label={`Select ${project.name} as the task project`}
					onClick={() => handleClick(project.projectId)}
					onKeyDown={e => {
            console.log(e.key)
						if (e.key === "Enter") handleClick(project.projectId)
					}}
				>
					<IndividualProject project={project} />
				</div>
			</li>
		))
	)
}

Projects.propTypes = {
	activeValue: string
}
