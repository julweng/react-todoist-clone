import React from "react"
import { firebase } from "../firebase"

export const Checkbox = ({ id }) => {
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
		>
			<span className="checkbox" />
		</div>
	)
}
