import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { AddTask } from "components"

jest.mock("../context", () => ({
	useSelectedProjectValue: jest.fn(() => ({ selectedProject: "1" })),
	useProjectsValue: jest.fn(() => ({ projects: [] }))
}))

jest.mock("../firebase", () => ({
	firebase: {
		firestore: jest.fn(() => ({
			collection: jest.fn(() => ({
				add: jest.fn(() => Promise.resolve("done"))
			}))
		}))
	}
}))

const createProps = ({
	shouldAddTaskMain = true,
	shouldShowMain = false,
	showQuickAddTask = false
} = {}) => ({
	shouldAddTaskMain,
	shouldShowMain,
	showQuickAddTask,
	setShowQuickAddTask: jest.fn()
})

describe("AddTask", () => {
	it("should render AddTask", () => {
		const props = createProps()
		render(<AddTask {...props} />)
		expect(screen.queryByTestId("add-task-comp")).toBeTruthy()
	})

	it("should render AddTask quick overlay", () => {
		const props = createProps({ showQuickAddTask: true })
		render(<AddTask {...props} />)
		expect(screen.queryByTestId("quick-add-task")).toBeTruthy()
	})

	it("should toggle AddTask main when 'Add Task' is clicked", () => {
		const props = createProps()
		render(<AddTask {...props} />)
		const { queryByTestId } = screen

		const addTask = queryByTestId("show-main-action")
		expect(queryByTestId("add-task-main")).toBeFalsy()

		fireEvent.click(addTask)
		expect(queryByTestId("add-task-main")).toBeTruthy()

		fireEvent.click(addTask)
		expect(queryByTestId("add-task-main")).toBeFalsy()
	})

	it("should show AddTask main when enter key is pressed on 'Add Task'", () => {
		const props = createProps()
		render(<AddTask {...props} />)
		const { queryByTestId } = screen

		const addTask = queryByTestId("show-main-action")
		expect(queryByTestId("add-task-main")).toBeFalsy()

		fireEvent.keyDown(addTask, {
			key: "Enter",
			code: 13
		})
		expect(queryByTestId("add-task-main")).toBeTruthy()

		fireEvent.keyDown(addTask, {
			key: "Enter",
			code: 13
		})
		expect(queryByTestId("add-task-main")).toBeFalsy()
	})

	it("should not toggle AddTask main when other key is pressed on 'Add Task'", () => {
		const props = createProps()
		render(<AddTask {...props} />)
		const { queryByTestId } = screen

		const addTask = queryByTestId("show-main-action")
		expect(queryByTestId("add-task-main")).toBeFalsy()

		fireEvent.keyDown(addTask, {
			key: "a",
			code: 65
		})
		expect(queryByTestId("add-task-main")).toBeFalsy()

		fireEvent.keyDown(addTask, {
			key: "a",
			code: 65
		})
		expect(queryByTestId("add-task-main")).toBeFalsy()
	})

	it("should toggle project overlay when project icon is clicked", () => {
		const props = createProps({ shouldShowMain: true })
		render(<AddTask {...props} />)
		const { queryByTestId } = screen

		const projectIcon = queryByTestId("show-project-overlay")
		expect(queryByTestId("project-overlay")).toBeFalsy()

		fireEvent.click(projectIcon)
		expect(queryByTestId("project-overlay")).toBeTruthy()

		fireEvent.click(projectIcon)
		expect(queryByTestId("project-overlay")).toBeFalsy()
	})

	it("should toggle project overlay when enter key is pressed on project icon", () => {
		const props = createProps({ shouldShowMain: true })
		render(<AddTask {...props} />)
		const { queryByTestId } = screen

		const projectIcon = queryByTestId("show-project-overlay")
		expect(queryByTestId("project-overlay")).toBeFalsy()

		fireEvent.keyDown(projectIcon, {
			key: "Enter",
			code: 13
		})
		expect(queryByTestId("project-overlay")).toBeTruthy()

		fireEvent.keyDown(projectIcon, {
			key: "Enter",
			code: 13
		})
		expect(queryByTestId("project-overlay")).toBeFalsy()
	})

	it("should not toggle project overlay when other key is pressed on project icon", () => {
		const props = createProps({ shouldShowMain: true })
		render(<AddTask {...props} />)
		const { queryByTestId } = screen

		const projectIcon = queryByTestId("show-project-overlay")
		expect(queryByTestId("project-overlay")).toBeFalsy()

		fireEvent.keyDown(projectIcon, {
			key: "a",
			code: 65
		})
		expect(queryByTestId("project-overlay")).toBeFalsy()
	})

	it("should hide project overlay when adding of a task is canceled", () => {
		const props = createProps({ shouldShowMain: true })
		render(<AddTask {...props} />)
		const { queryByTestId } = screen

		const projectIcon = queryByTestId("show-project-overlay")
		const cancelAdd = queryByTestId("add-task-main-cancel")

		fireEvent.click(projectIcon)
		expect(queryByTestId("project-overlay")).toBeTruthy()

		fireEvent.click(cancelAdd)
		expect(queryByTestId("project-overlay")).toBeFalsy()
	})

	it("should hide project overlay when task date icon is clicked", () => {
		const props = createProps({ shouldShowMain: true })
		render(<AddTask {...props} />)
		const { queryByTestId } = screen

		const projectIcon = queryByTestId("show-project-overlay")
		const dateIcon = queryByTestId("show-task-date-overlay")

		fireEvent.click(projectIcon)
		expect(queryByTestId("project-overlay")).toBeTruthy()

		fireEvent.click(dateIcon)
		expect(queryByTestId("project-overlay")).toBeFalsy()
	})

	it("should toggle task date overlay when date icon is clicked", () => {
		const props = createProps({ shouldShowMain: true })
		render(<AddTask {...props} />)
		const { queryByTestId } = screen

		const dateIcon = queryByTestId("show-task-date-overlay")
		expect(queryByTestId("task-date-overlay")).toBeFalsy()

		fireEvent.click(dateIcon)
		expect(queryByTestId("task-date-overlay")).toBeTruthy()

		fireEvent.click(dateIcon)
		expect(queryByTestId("task-date-overlay")).toBeFalsy()
	})

	it("should toggle task date overlay when enter key is pressed on date icon", () => {
		const props = createProps({ shouldShowMain: true })
		render(<AddTask {...props} />)
		const { queryByTestId } = screen

		const dateIcon = queryByTestId("show-task-date-overlay")
		expect(queryByTestId("task-date-overlay")).toBeFalsy()

		fireEvent.keyDown(dateIcon, {
			key: "Enter",
			code: 13
		})
		expect(queryByTestId("task-date-overlay")).toBeTruthy()

		fireEvent.keyDown(dateIcon, {
			key: "Enter",
			code: 13
		})
		expect(queryByTestId("task-date-overlay")).toBeFalsy()
	})

	it("should not toggle task date overlay when other key is pressed on date icon", () => {
		const props = createProps({ shouldShowMain: true })
		render(<AddTask {...props} />)
		const { queryByTestId } = screen

		const dateIcon = queryByTestId("show-task-date-overlay")
		expect(queryByTestId("task-date-overlay")).toBeFalsy()

		fireEvent.keyDown(dateIcon, {
			key: "a",
			code: 65
		})
		expect(queryByTestId("task-date-overlay")).toBeFalsy()
	})

	it("should hide task date overlay when adding of a task is canceled", () => {
		const props = createProps({ shouldShowMain: true })
		render(<AddTask {...props} />)
		const { queryByTestId } = screen

		const dateIcon = queryByTestId("show-task-date-overlay")
		const cancelAdd = queryByTestId("add-task-main-cancel")

		fireEvent.click(dateIcon)
		expect(queryByTestId("task-date-overlay")).toBeTruthy()

		fireEvent.click(cancelAdd)
		expect(queryByTestId("task-date-overlay")).toBeFalsy()
	})

	it("should hide task date overlay when project icon is clicked", () => {
		const props = createProps({ shouldShowMain: true })
		render(<AddTask {...props} />)
		const { queryByTestId } = screen

		const projectIcon = queryByTestId("show-project-overlay")
		const dateIcon = queryByTestId("show-task-date-overlay")

		fireEvent.click(dateIcon)
		expect(queryByTestId("task-date-overlay")).toBeTruthy()

		fireEvent.click(projectIcon)
		expect(queryByTestId("task-date-overlay")).toBeFalsy()
	})

	it("should render quick add task if showQuickAddTask is true", () => {
		const props = createProps({ showQuickAddTask: true })
		render(<AddTask {...props} />)
		const { queryByTestId } = screen

		expect(queryByTestId("quick-add-task")).toBeTruthy
	})

	it("should call setShowQuickAddTask with false when 'x' in add task overlay is clicked", () => {
		const props = createProps({ showQuickAddTask: true })
		render(<AddTask {...props} />)

		const { queryByTestId } = screen
		expect(queryByTestId("add-task-comp")).toHaveClass("add-task__overlay")

		const cancelIcon = queryByTestId("add-task-quick-cancel")
		expect(queryByTestId("quick-add-task")).toBeTruthy()

		fireEvent.click(cancelIcon)
		expect(props.setShowQuickAddTask).toHaveBeenCalledWith(false)
	})

	it("should call setShowQuickAddTask with false when enter key is pressed on 'x'", () => {
		const props = createProps({ showQuickAddTask: true })
		render(<AddTask {...props} />)

		const { queryByTestId } = screen
		expect(queryByTestId("add-task-comp")).toHaveClass("add-task__overlay")

		const cancelIcon = queryByTestId("add-task-quick-cancel")
		expect(queryByTestId("quick-add-task")).toBeTruthy()

		fireEvent.keyDown(cancelIcon, {
			key: "Enter",
			code: 13
		})
		expect(props.setShowQuickAddTask).toHaveBeenCalledWith(false)
	})

	it("should not call setShowQuickAddTask when other key is pressed on 'x'", () => {
		const props = createProps({ showQuickAddTask: true })
		render(<AddTask {...props} />)

		const { queryByTestId } = screen
		expect(queryByTestId("add-task-comp")).toHaveClass("add-task__overlay")

		const cancelIcon = queryByTestId("add-task-quick-cancel")
		expect(queryByTestId("quick-add-task")).toBeTruthy()

		fireEvent.keyDown(cancelIcon, {
			key: "a",
			code: 65
		})
		expect(props.setShowQuickAddTask).not.toHaveBeenCalled()
	})

	it("should change input value as user enter a task", () => {
		const props = createProps({ shouldShowMain: true })
		render(<AddTask {...props} />)
		const { queryByTestId } = screen

		const input = queryByTestId("add-task-content")

		fireEvent.change(input, { target: { value: "hahaha" } })
		expect(input.value).toEqual("hahaha")
	})
})
