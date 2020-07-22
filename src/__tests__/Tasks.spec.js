import React from "react"
import { render, screen } from "@testing-library/react"
import { useSelectedProjectValue } from "context"
import { Tasks } from "components"

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
			},
			{
				name: "MUSIC",
				projectId: "2",
				userId: process.env.REACT_APP_USER_ID,
				docId: "abcd12345678"
			}
		]
	}))
}))

jest.mock("hooks", () => ({
	useTasks: () => ({
		tasks: [
			{
				id: "12345678abcd",
				archived: false,
				date: "03/03/2020",
				projectId: "1",
				task: "blah blah blah",
				userId: "11335577"
			},
			{
				id: "12345678erfg",
				archived: false,
				date: "02/02/2020",
				projectId: "1",
				task: "ha ha ha",
				userId: "11335577"
			}
		]
	})
}))

describe("Tasks", () => {
	afterEach(() => jest.clearAllMocks())

	it("should render all tasks by default", () => {
    render(<Tasks />)
		const { getByTestId, getAllByTestId, getByText } = screen

    expect(getByTestId("tasks")).toBeTruthy()
		expect(getAllByTestId("task-item").length).toEqual(2)
		expect(getByText("blah blah blah")).toBeTruthy()
		expect(getByText("ha ha ha")).toBeTruthy()
	})

	it("Should render project title", () => {
    useSelectedProjectValue.mockImplementationOnce(() => ({
			setSelectedProject: jest.fn(() => "1"),
			selectedProject: "1"
    }))
    
    render(<Tasks />)
    const { getByTestId } = screen
    expect(getByTestId("project-name")).toHaveTextContent("THE OFFICE")
	})
})
