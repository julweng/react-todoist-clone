import React, { useEffect } from "react"
import { useTasks } from "hooks"
import { getTitle, getCollatedTitle, collatedTasksExist } from "helpers"
import { useSelectedProjectValue, useProjectsValue } from "context"
import { AddTask, Checkbox } from "."
import { collatedTasks } from "../constants"

export const Tasks = () => {
	const { selectedProject } = useSelectedProjectValue()
	const { projects } = useProjectsValue()
	const { tasks } = useTasks(selectedProject)

	let projectName = ""

	if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
		projectName = getTitle(projects, selectedProject)?.name
	}

	if (
		projects.length > 0 &&
		collatedTasksExist(selectedProject) &&
		selectedProject
	) {
		projectName = getCollatedTitle(collatedTasks, selectedProject)?.name
	}

	useEffect(() => {
		document.title = `${projectName}: Todoist`
	})

	return (
		<div className="tasks" data-testid="tasks">
			<h2 data-testid="project-name">{projectName}</h2>
			<ul className="tasks__list">
				{tasks.map(task => (
					<li key={`${task.id}`} data-testid="task-item">
						<Checkbox id={task.id} taskDesc={task.task} />
						<span>{task.task}</span>
					</li>
				))}
			</ul>
			<AddTask />
		</div>
	)
}
