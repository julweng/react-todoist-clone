import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { ProjectOverlay } from "components"

jest.mock("../context", () => ({
	useProjectsValue: jest.fn(() => ({
		projects: [
			{
				name: "🙌 THE OFFICE",
				projectId: "1",
				userId: "jlIFXIwyAL3tzHMtzRbw",
				docId: "michael-scott"
			}
		]
	}))
}))

const createProps = ({ showProjectOverlay = true } = {}) => ({
	setProject: jest.fn(),
	setShowProjectOverlay: jest.fn(),
	showProjectOverlay
})

describe("ProjectOverlay", () => {
	afterEach(() => jest.clearAllMocks())

	it("should render ProjectOverlay when showProjectOverlay is true", () => {
		const props = createProps()
		render(<ProjectOverlay {...props} />)
		expect(screen.queryByTestId("project-overlay")).toBeTruthy()
	})

	it("should not render ProjectOverlay when showProjectOverlay is false", () => {
		const props = createProps({ showProjectOverlay: false })
		render(<ProjectOverlay {...props} />)
		expect(screen.queryByTestId("project-overlay")).toBeFalsy()
	})

	it("should call setShowProjectOverlay using onClick", () => {
		const props = createProps()
		render(<ProjectOverlay {...props} />)

		const { queryByTestId } = screen

		expect(queryByTestId("project-overlay")).toBeTruthy()
		fireEvent.click(queryByTestId("project-overlay-action"))
		expect(props.setProject).toHaveBeenCalled()
	})

	it("should call setShowProjectOverlay when enter key is pressed on project name", () => {
		const props = createProps()
		render(<ProjectOverlay {...props} />)

		const { queryByTestId } = screen

		fireEvent.keyDown(queryByTestId("project-overlay-action"), {
			key: "Enter",
			code: 13
		})
		expect(props.setProject).toHaveBeenCalled()
	})

	it("should not call setShowProjectOverlay when other key is pressed on project name", () => {
		const props = createProps()
		render(<ProjectOverlay {...props} />)

		const { queryByTestId } = screen

		fireEvent.keyDown(queryByTestId("project-overlay-action"), {
			key: "a",
			code: 65
		})
		expect(props.setProject).not.toHaveBeenCalled()
	})
})
