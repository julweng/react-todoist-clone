import React, { useState } from "react"
import { shape, string } from "prop-types"
import { FaTrashAlt } from "react-icons/fa"
import { useProjectsValue, useSelectedProjectValue } from "context"
import { firebase } from "../firebase"

export const IndividualProject = ({ project }) => {
	const [showConfirm, setShowConfirm] = useState(false)
	const { projects, setProjects } = useProjectsValue()
	const { setSelectedProject } = useSelectedProjectValue()

	const handleShowConfirm = () => setShowConfirm(!showConfirm)

	const handleDelete = () => deleteProject(project.docId)

	const deleteProject = docId => {
		firebase
			.firestore()
			.collection("projects")
			.doc(docId)
			.delete()
			.then(() => {
				setProjects([...projects])
				setSelectedProject("INBOX")
			})
	}

	return (
		<div data-testid="individual-project">
			<span className="sidebar__dot">•</span>
			<span className="sidebar__project-name">{project.name}</span>
			<span
				className="sidebar__project-delete"
				data-testid="delete-project"
				onClick={() => handleShowConfirm()}
				onKeyDown={e => {
					if (e.key === "Enter") handleShowConfirm()
				}}
				tabIndex={0}
				role="button"
				aria-label="confirm deletion of project"
			>
				<FaTrashAlt />
				{showConfirm && (
					<div className="project-delete-modal" data-testid="project-delete-modal">
						<div className="project-delete-modal__inner">
							<p>Are you sure you want to delete this project?</p>
							<div>
								<button type="button" onClick={() => handleDelete()}>
									Delete
								</button>
								<span
									onClick={() => handleShowConfirm()}
									onKeyDown={e => {
										if (e.key === "Enter") handleShowConfirm()
									}}
									tabIndex={0}
									role="button"
									aria-label="cancel adding project"
								>
									Cancel
								</span>
							</div>
						</div>
					</div>
				)}
			</span>
		</div>
	)
}

IndividualProject.propTypes = {
	project: shape({
		name: string,
		docId: string
	})
}

