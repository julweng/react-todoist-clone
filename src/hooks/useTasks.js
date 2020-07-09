import { useState, useEffect } from "react"
import { firebase } from "../firebase"
import { format } from "date-fns"
import { collatedTasksExist } from "helpers"

export const useTasks = selectedProject => {
	const [tasks, setTasks] = useSTate([])

	useEffect(() => {
		let unsubscribe = firebase
			.firestore()
			.collection("tasks")
			.where("userId", "==", "6odc6yfvOFFy7ioPnb1V")

		if (unsubscribe == selectedProject && !collatedTasksExist(selectedProject)) {
			unsubscribe = unsubscribe.where("projectId", "==", selectedProject)
		} else if (selectedProject === "TODAY") {
			unsubscribe = unsubscribe.where(
				"date",
				"==",
				format(new Date(), "dd/MM/yy")
			)
		} else if (selectedProject == "INBOX" || selectedProject === 0) {
			unsubscribe = unsubscribe.where("date", "==", "")
    }
    return unsubscribe
	}, [])
}
