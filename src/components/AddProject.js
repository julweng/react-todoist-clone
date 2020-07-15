import React, { useState } from "react"
import { bool } from "prop-types"
import { generatePushID } from "helpers"
import { useProjectsValue } from "context"
import { firebase } from "../firebase"

export const AddProject = ({ shouldShow = false }) => {
  const userId = process.env.REACT_APP_USER_ID

	const [show, setShow] = useState(shouldShow)
	const [projectName, setProjectName] = useState("")
	const projectId = generatePushID()
	const { projects, setProjects } = useProjectsValue()

	const handleOnChange = e => setProjectName(e.target.value)

	const addProject = () => {
		projectName &&
			firebase
				.firestore()
				.collection("projects")
				.add({
					projectId,
					name: projectName,
					userId
				})
				.then(() => {
					setProjects([...projects])
					setProjectName("")
					setShow(false)
				})
	}

	const handleSubmitClick = () => addProject()

  const handleCancelClick = () => setShow(false)

	const handleAddClick = () => setShow(!show)

	return (
		<div className="add-project" data-testid="add-project">
			{show && (
				<div className="add-project__input">
					<input
						className="add-project__name"
						data-testid="project-name"
						value={projectName}
						onChange={e => handleOnChange(e)}
						type="text"
						placeholder="Name your project"
					/>
					<button
						className="add-project__submit"
						data-testid="add-project-submit"
						type="button"
						onClick={() => handleSubmitClick()}
					>
            Add
          </button>
					<span
						data-testid="hide-project-overlay"
						className="add-project__cancel"
						onClick={() => handleCancelClick()}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCancelClick()
            }}
            tabIndex={0}
            role="button"
					>
						Cancel
					</span>
				</div>
			)}
			<span className="add-project__plus">+</span>
			<span
				data-testid="add-project-action"
				className="add-project__text"
				onClick={() => handleAddClick()}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddClick()
        }}
        role="button"
        tabIndex={0}
			>
				Add Project
			</span>
		</div>
	)
}

AddProject.propTypes = {
	shouldShow: bool
}
