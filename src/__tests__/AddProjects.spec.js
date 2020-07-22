import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { AddProject } from "components"

jest.mock("../context", () => ({
	useSelectedProjectValue: jest.fn(),
	useProjectsValue: jest.fn(() => ({
		projects: [
			{
				name: "🙌 THE OFFICE",
				projectId: "1",
				userId: "jlIFXIwyAL3tzHMtzRbw",
				docId: "michael-scott"
			},
			{
				name: "🚀 DAILY",
				projectId: "2",
				userId: "jlIFXIwyAL3tzHMtzRbw",
				docId: "daily-office"
			}
		],
		setProjects: jest.fn()
	}))
}))

jest.mock("../firebase", () => ({
	firebase: {
		firestore: jest.fn(() => ({
			collection: jest.fn(() => ({
				add: jest.fn(() => Promise.resolve("I am resolved!"))
			}))
		}))
	}
}))

describe("AddProject", () => {
	it("should render AddProject", () => {
		render(<AddProject />)
		expect(screen.getByTestId("add-project")).toBeTruthy()
	})

	it("should show input for adding a project when 'Add Project' is clicked", () => {
		render(<AddProject />)
		const { queryByTestId } = screen
		expect(queryByTestId("project-name")).toBeFalsy()

		fireEvent.click(queryByTestId("add-project-action"))
		expect(queryByTestId("project-name")).toBeTruthy()
	})

	it("should show input for adding a project when enter key is pressed on 'Add Project'", () => {
		render(<AddProject />)
		const { queryByTestId } = screen

		expect(queryByTestId("project-name")).toBeFalsy()

		fireEvent.keyDown(queryByTestId("add-project-action"), {
			key: "Enter",
			code: 13
		})
		expect(screen.queryByTestId("project-name")).toBeTruthy()
	})

	it("should show not input for adding a project when other key is pressed on 'Add Project'", () => {
		render(<AddProject />)
		const { queryByTestId } = screen

		expect(queryByTestId("project-name")).toBeFalsy()

		fireEvent.keyDown(queryByTestId("add-project-action"), {
			key: "a",
			code: 65
		})
		expect(queryByTestId("project-name")).toBeFalsy()
	})

	it("should show placeholder in input for project name", () => {
		render(<AddProject />)
		const { queryByTestId } = screen

		fireEvent.click(queryByTestId("add-project-action"))

		const input = queryByTestId("project-name")
		expect(input.placeholder).toEqual("Name your project")
	})

	it("should change input value when project name is filled in", () => {
		render(<AddProject />)
		const { queryByTestId } = screen

		fireEvent.click(queryByTestId("add-project-action"))

		const input = queryByTestId("project-name")
		expect(input.value).toEqual("")

		fireEvent.change(input, { target: { value: "awesome project" } })
		expect(input.value).toEqual("awesome project")
	})

	it("should hide the project input when 'Cancel' is clicked", () => {
		render(<AddProject shouldShow />)
		const { queryByTestId } = screen

		expect(queryByTestId("project-name")).toBeTruthy()

		const cancel = queryByTestId("hide-project-overlay")
		expect(cancel).toBeTruthy()

		fireEvent.click(queryByTestId("hide-project-overlay"))
		expect(queryByTestId("project-name")).toBeFalsy()
	})

	it("should hide the project input when enter key is pressed on 'Cancel'", () => {
		render(<AddProject shouldShow />)
		const { queryByTestId } = screen

		expect(queryByTestId("project-name")).toBeTruthy()

		const cancel = queryByTestId("hide-project-overlay")
		expect(cancel).toBeTruthy()

		fireEvent.keyDown(cancel, {
			key: "Enter",
			code: 13
		})

		expect(queryByTestId("project-name")).toBeFalsy()
	})

	it("should not hide the project input when other key is pressed on 'Cancel'", () => {
		render(<AddProject shouldShow />)
		const { queryByTestId } = screen

		expect(queryByTestId("project-name")).toBeTruthy()

		const cancel = queryByTestId("hide-project-overlay")
		expect(cancel).toBeTruthy()

		fireEvent.keyDown(cancel, {
			key: "a",
			code: 65
		})

		expect(queryByTestId("project-name")).toBeTruthy()
	})

	it("should toggle the project input when 'Add Project' is clicked", () => {
		render(<AddProject />)
		const { queryByTestId } = screen

		const add = queryByTestId("add-project-action")

		fireEvent.click(add)
		expect(queryByTestId("project-name")).toBeTruthy()

		fireEvent.click(add)
		expect(queryByTestId("project-name")).toBeFalsy()
	})

	it("Should toggle the project input when enter key is preseed on 'Add Project'", () => {
		render(<AddProject />)
		const { queryByTestId } = screen

		const add = queryByTestId("add-project-action")

		fireEvent.keyDown(add, {
			key: "Enter",
			code: 13
		})
		expect(queryByTestId("project-name")).toBeTruthy()

		fireEvent.keyDown(add, {
			key: "Enter",
			code: 13
		})
		expect(queryByTestId("project-name")).toBeFalsy()
	})

	it("Should not toggle the project input when other key is preseed on 'Add Project'", () => {
		render(<AddProject />)
		const { queryByTestId } = screen

		const add = queryByTestId("add-project-action")

		fireEvent.keyDown(add, {
			key: "Enter",
			code: 13
		})
		expect(queryByTestId("project-name")).toBeTruthy()

		fireEvent.keyDown(add, {
			key: "a",
			code: 65
		})
		expect(queryByTestId("project-name")).toBeTruthy()
	})
})
