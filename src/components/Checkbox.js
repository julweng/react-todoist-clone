import React from "react"
import { string } from "prop-types"
import { firebase } from "../firebase"

export const Checkbox = ({ id, taskDesc }) => {
	const archiveTask = () => {
		firebase.firestore().collection("tasks").doc(id).update({
			archived: true
		})
	}

	return (
		<div
			className="checkbox__holder"
			data-testid="checkbox-action"
			onClick={() => archiveTask()}
			onKeyDown={e => {
				if (e.key === "Enter") archiveTask()
			}}
      aria-label={`mark ${taskDesc} as done?`}
      role="button"
      tabIndex={0}
		>
			<span className="checkbox" />
		</div>
	)
}

Checkbox.propTypes = {
  id: string,
  taskDesc: string
}
