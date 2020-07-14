import React, { useState } from "react"
import { bool, func } from "prop-types"
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa"
import { format, addDays } from "date-fns"
import { useSelectedProjectValue } from "context"
import { ProjectOverlay } from "."
import { firebase } from "../firebase"

export const AddTask = ({
	showAddTaskMain = true,
	shouldShowMain = false,
	showQuickAddTask,
	setShowQuickAddTask
}) => {
	const [task, setTask] = useState("")
	const [taskDate, setTaskDate] = useState("")
	const [project, setProject] = useState("")
	const [showMain, setShowMain] = useState(shouldShowMain)
	const [showProjectOverlay, setShowProjectOverlay] = useState(false)
	const [showTaskDate, setShowTaskDate] = useState(false)

	const { selectedProject } = useSelectedProjectValue()

	const addTask = () => {
		const projectId = project || selectedProject
		let collatedDate = ""

		if (projectId === "TODAY") {
			collatedDate = format(new Date(), "dd/MM/yyyy")
		} else if (projectId === "NEXT_7") {
			collatedDate = format(addDays(new Date(), 7), "dd/MM/yyyy")
		}

		return (
			task &&
			projectId &&
			firebase
				.firestore()
				.collection("tasks")
				.add({
					archived: false,
					projectId,
					task,
					date: collatedDate || taskDate,
					userId: "6odc6yfvOFFy7ioPnb1V"
				})
				.then(() => {
					setTask("")
					setProject("")
					setShowMain("")
					setShowProjectOverlay(false)
				})
		)
	}

	const handleShowMain = () => setShowMain(!showMain)

	const handleCancel = () => {
		if (showQuickAddTask) {
			setShowQuickAddTask(false)
		}
		setShowMain(false)
		setShowProjectOverlay(false)
	}

	const handleOnChange = e => setTask(e.target.value)

	const handleAddTask = () => addTask()

	const handleShowProject = () => setShowProjectOverlay(!showProjectOverlay)

	const handleShowTaskDate = () => setShowTaskDate(!showTaskDate)

	return (
		<div
			className={showQuickAddTask ? "add-task add-task__overlay" : "add-task"}
			data-testid="add-task-comp"
		>
			{showAddTaskMain && (
				<div
					className="add-task__shallow"
					data-testid="show-main-action"
					onClick={() => handleShowMain()}
				>
					<span className="add-task__plus">+</span>
					<span className="add-task__text">Add Task</span>
				</div>
			)}
			{(showMain || showQuickAddTask) && (
				<div className="add-task__main" data-testid="add-task-main">
					{showQuickAddTask && (
						<>
							<div data-testid="quick-add-task">
								<h2 className="header">Quick Add Task</h2>
								<span
									className="add-task__cancel-x"
									data-testid="add-task-quick-cancel"
									onClick={() => handleCancel()}
								>
									X
								</span>
							</div>
						</>
					)}
					<ProjectOverlay
						showProjectOverlay={showProjectOverlay}
						setProject={setProject}
						setShowProjectOverlay={setShowProjectOverlay}
					/>
					<p>Task Date here</p>
					<input
						className="add-task__content"
						data-testid="add-task-content"
						type="text"
						value={task}
						onChange={e => handleOnChange(e)}
					/>
					<button
						type="button"
						className="add-task__submit"
						data-testid="add-task"
						onClick={() => handleAddTask()}
					>
						Add Task
					</button>
					{!showQuickAddTask && (
						<span
							className="add-task__cancel"
							data-testid="add-task-main-cancel"
							onClick={() => handleCancel()}
						>
							Cancel
						</span>
					)}
					<span
						className="add-task__project"
						data-testid="show-project-overlay"
						onClick={() => handleShowProject()}
					>
						<FaRegListAlt />
					</span>
					<span
						className="add-task__date"
						data-testid="show-task-date-overlay"
						onClick={() => handleShowTaskDate()}
					>
						<FaRegCalendarAlt />
					</span>
				</div>
			)}
		</div>
	)
}

AddTask.propTypes = {
	showAddTaskMain: bool,
	shouldShowMain: bool,
	showQuickAddTask: bool,
	setShowQuickAddTask: func
}
