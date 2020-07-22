import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Header } from "components/layout"

jest.mock("context", () => ({
	useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
	useProjectsValue: jest.fn(() => ({ projects: [] }))
}))

const createProps = ({ darkMode = false } = {}) => ({
	darkMode,
	setDarkMode: jest.fn(() => !darkMode)
})

describe("Header", () => {
	it("should render header component", () => {
		const props = createProps()
		render(<Header {...props} />)
		expect(screen.getByTestId("header")).toBeTruthy()
	})

	it("should not be in darkmode by default", () => {
		const props = createProps()
		render(<Header {...props} />)
		expect(props.setDarkMode).not.toHaveBeenCalled()
	})

	it("should set dark mode using onClick", () => {
		const props = createProps()
		render(<Header {...props} />)

		userEvent.click(screen.getByTestId("dark-mode-action"))
		expect(props.setDarkMode).toHaveBeenCalledWith(true)
	})

	it("should set dark mode by pressing enter", () => {
		const props = createProps()
		render(<Header {...props} />)

		fireEvent.keyDown(screen.getByTestId("dark-mode-action"), {
			key: "Enter",
			code: 13
		})

		expect(props.setDarkMode).toHaveBeenCalledWith(true)
  })
  
  it("should not set dark mode by pressing other key", () => {
		const props = createProps()
		render(<Header {...props} />)

		fireEvent.keyDown(screen.getByTestId("dark-mode-action"), {
			key: "a",
			code: 65
		})

		expect(props.setDarkMode).not.toHaveBeenCalled()
  })
  
  it("should render AddTask", () => {
    const props = createProps()
		render(<Header {...props} />)
    expect(screen.getByTestId("add-task-comp")).toBeTruthy()
  })
})
