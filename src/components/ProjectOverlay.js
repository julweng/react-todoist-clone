import React from "react"
import { bool, func } from "prop-types"
import { useProjectsValue } from "context"

export const ProjectOverlay = ({
	setProject,
	setShowProjectOverlay,
	showProjectOverlay
}) => {
	const { projects } = useProjectsValue()

	const handleProjectClick = projectId => {
		setProject(projectId)
		setShowProjectOverlay(false)
	}

	return (
		projects &&
		showProjectOverlay && (
			<div className="project-overlay" data-testid="project-overlay">
				<ul className="project-overlay__list">
					{projects.map(project => (
						<li
							key={project.docId}
							data-testid="project-overlay-action"
							onClick={() => handleProjectClick(project.projectId)}
							onKeyDown={e => {
								if (e.key === "Enter") {
									handleProjectClick(project.projectId)
								}
							}}
							role="button"
							tabIndex={0}
							aria-label="select the task project"
						>
							{project.name}
						</li>
					))}
				</ul>
			</div>
		)
	)
}

ProjectOverlay.propTypes = {
	setProject: func,
	setShowProjectOverlay: func,
	showProjectOverlay: bool
}
