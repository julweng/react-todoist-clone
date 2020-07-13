import { useState, useEffect } from "react"
import { firebase } from "../firebase"
import { differenceInDays, format } from "date-fns"
import { collatedTasksExist } from "helpers"

export const useTasks = selectedProject => {
	const [tasks, setTasks] = useState([])
	const [archivedTasks, setArchivedTasks] = useState([])

	useEffect(() => {
		let unsubscribe = firebase
			.firestore()
			.collection("tasks")
      .where("userId", "==", "6odc6yfvOFFy7ioPnb1V")
console.log("called", selectedProject)
    if (selectedProject && !collatedTasksExist(selectedProject)) {
      unsubscribe = unsubscribe.where("projectId", "==", selectedProject)
    } else if (selectedProject === "TODAY") {
      unsubscribe = unsubscribe.where(
        "date",
        "==",
        format(new Date(), "dd/MM/yyyy")
      )
    } else if (selectedProject === "INBOX" || selectedProject === 0) {
      console.log("INBOX")
      unsubscribe = unsubscribe.where("date", "==", "")
    }

		unsubscribe = unsubscribe.onSnapshot(snapshot => {
			const newTasks = snapshot.docs.map(task => ({
				id: task.id,
				...task.data()
			}))

			setTasks(
				selectedProject === "NEXT_7"
					? newTasks.filter(
							task =>
								differenceInDays(task.date, new Date()) <= 7 &&
								!task.archived
					  )
					: newTasks.filter(task => !task.archived)
			)
			setArchivedTasks(newTasks.filter(task => task.archived))
		})

		return () => unsubscribe()
	}, [selectedProject])

	return { tasks, archivedTasks }
}
