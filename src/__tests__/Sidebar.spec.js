import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Sidebar } from "components/layout"

jest.mock("context", () => ({
	useSelectedProjectValue: jest.fn(() => ({
		setSelectedProject: jest.fn(() => "INBOX")
	})),
	useProjectsValue: jest.fn(() => ({
		projects: [
			{
				name: "THE OFFICE",
				projectId: "1",
				userId: process.env.REACT_APP_USER_ID,
				docId: "12345678abcd"
			}
		]
	}))
}))

describe("Sidebar", () => {
	it("should render sidebar", () => {
		render(<Sidebar />)
		expect(screen.getByTestId("sidebar")).toBeTruthy()
	})

	it("should show inbox as active by default", () => {
		render(<Sidebar />)
		const { getByTestId } = screen

		const inbox = getByTestId("inbox")
		const today = getByTestId("today")
		const next7 = getByTestId("next_7")

		expect(inbox).toHaveClass("active")
		expect(today).not.toHaveClass("active")
		expect(next7).not.toHaveClass("active")
	})

	it("should change the active project to today when today is clicked", () => {
		render(<Sidebar />)
		const { getByTestId } = screen

		const inbox = getByTestId("inbox")
		const today = getByTestId("today")
		const next7 = getByTestId("next_7")

		expect(inbox).toHaveClass("active")
		expect(today).not.toHaveClass("active")
		expect(next7).not.toHaveClass("active")

		userEvent.click(getByTestId("today-action"))

		expect(inbox).not.toHaveClass("active")
		expect(today).toHaveClass("active")
		expect(next7).not.toHaveClass("active")
	})

	it("should change the active project to today when enter key is pressed on today", () => {
		render(<Sidebar />)
		const { getByTestId } = screen

		const inbox = getByTestId("inbox")
		const today = getByTestId("today")
		const next7 = getByTestId("next_7")

		expect(inbox).toHaveClass("active")
		expect(today).not.toHaveClass("active")
		expect(next7).not.toHaveClass("active")

		fireEvent.keyDown(getByTestId("today-action"), {
			key: "Enter",
			code: 13
		})

		expect(inbox).not.toHaveClass("active")
		expect(today).toHaveClass("active")
		expect(next7).not.toHaveClass("active")
	})

	it("should not change the active project to today when other key is pressed on today", () => {
		render(<Sidebar />)
		const { getByTestId } = screen

		const inbox = getByTestId("inbox")
		const today = getByTestId("today")
		const next7 = getByTestId("next_7")

		expect(inbox).toHaveClass("active")
		expect(today).not.toHaveClass("active")
		expect(next7).not.toHaveClass("active")

		fireEvent.keyDown(getByTestId("today-action"), {
			key: "a",
			code: 65
		})

		expect(inbox).toHaveClass("active")
		expect(today).not.toHaveClass("active")
		expect(next7).not.toHaveClass("active")
	})

	it("should change the active project to next 7 days when next 7 days is clicked", () => {
		render(<Sidebar />)
		const { getByTestId } = screen

		const inbox = getByTestId("inbox")
		const today = getByTestId("today")
		const next7 = getByTestId("next_7")

		expect(inbox).toHaveClass("active")
		expect(today).not.toHaveClass("active")
		expect(next7).not.toHaveClass("active")

		userEvent.click(getByTestId("next_7-action"))

		expect(inbox).not.toHaveClass("active")
		expect(today).not.toHaveClass("active")
		expect(next7).toHaveClass("active")
	})

	it("should change the active project to next 7 days when enter key is pressed on next 7 days", () => {
		render(<Sidebar />)
		const { getByTestId } = screen

		const inbox = getByTestId("inbox")
		const today = getByTestId("today")
		const next7 = getByTestId("next_7")

		expect(inbox).toHaveClass("active")
		expect(today).not.toHaveClass("active")
		expect(next7).not.toHaveClass("active")

		fireEvent.keyDown(getByTestId("next_7-action"), {
			key: "Enter",
			code: 13
		})

		expect(inbox).not.toHaveClass("active")
		expect(today).not.toHaveClass("active")
		expect(next7).toHaveClass("active")
	})

	it("should not change the active project to next 7 days when other key is pressed on next 7 days", () => {
		render(<Sidebar />)
		const { getByTestId } = screen

		const inbox = getByTestId("inbox")
		const today = getByTestId("today")
		const next7 = getByTestId("next_7")

		expect(inbox).toHaveClass("active")
		expect(today).not.toHaveClass("active")
		expect(next7).not.toHaveClass("active")

		fireEvent.keyDown(getByTestId("next_7-action"), {
			key: "a",
			code: 65
		})

		expect(inbox).toHaveClass("active")
		expect(today).not.toHaveClass("active")
		expect(next7).not.toHaveClass("active")
	})

	it("Should render AddProject by default", () => {
		render(<Sidebar />)
		expect(screen.queryByTestId("add-project")).toBeTruthy()
	})

	it("Should render Projects by default", () => {
		render(<Sidebar />)
		expect(screen.queryByTestId("project-action-parent")).toBeTruthy()
	})

	it("should toggle to show/hide sidebar projects using onClick on Projects", () => {
		render(<Sidebar />)
		const { queryByTestId, getByText } = screen

		userEvent.click(getByText("Projects"))

		expect(queryByTestId("add-project")).toBeFalsy()
		expect(queryByTestId("project-action-parent")).toBeFalsy()

		userEvent.click(getByText("Projects"))
		expect(queryByTestId("add-project")).toBeTruthy()
		expect(queryByTestId("project-action-parent")).toBeTruthy()
	})

	it("should toggle to show/hide sidebar projects when enter key is pressed on Projects", () => {
		render(<Sidebar />)
		const { queryByTestId, getByText } = screen

		fireEvent.keyDown(getByText("Projects"), {
			key: "Enter",
			code: 13
		})

		expect(queryByTestId("add-project")).toBeFalsy()
		expect(queryByTestId("project-action-parent")).toBeFalsy()

		fireEvent.keyDown(getByText("Projects"), {
			key: "Enter",
			code: 13
		})
    
    expect(queryByTestId("add-project")).toBeTruthy()
		expect(queryByTestId("project-action-parent")).toBeTruthy()
  })
  
  it("should not toggle to show/hide sidebar projects when other key is pressed on Projects", () => {
		render(<Sidebar />)
		const { queryByTestId, getByText } = screen

		fireEvent.keyDown(getByText("Projects"), {
			key: "a",
			code: 65
		})

		expect(queryByTestId("add-project")).toBeTruthy()
		expect(queryByTestId("project-action-parent")).toBeTruthy()
	})
})
