import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { IndividualProject } from "components"
import { firebase } from "../firebase"

jest.mock("../firebase", () => ({
	firebase: {
		firestore: jest.fn(() => ({
			collection: jest.fn(() => ({
				doc: jest.fn(() => ({
					delete: jest.fn(() => Promise.resolve("meh")),
					update: jest.fn()
				}))
			}))
		}))
	}
}))

jest.mock("../context", () => ({
	useSelectedProjectValue: jest.fn(() => ({
		setSelectedProject: jest.fn(() => "INBOX")
	})),
	useProjectsValue: jest.fn(() => ({
		setProjects: jest.fn(),
		projects: [
			{
				name: "🙌 THE OFFICE",
				projectId: "1",
				userId: "jlIFXIwyAL3tzHMtzRbw",
				docId: "1234567"
			}
		]
	}))
}))

describe("IndividualProject", () => {
	afterEach(() => jest.clearAllMocks())

	const project = {
		name: "🙌 THE OFFICE",
		projectId: "1",
		userId: "jlIFXIwyAL3tzHMtzRbw",
		docId: "1234567"
	}

	it("should render IndividualProject", () => {
		render(<IndividualProject project={project} />)
		expect(screen.queryAllByTestId("individual-project")).toBeTruthy()
	})

	it("should render selected project", () => {
		render(<IndividualProject project={project} />)
		expect(screen.getByText("🙌 THE OFFICE")).toBeTruthy()
	})

	it("should render the delete overlay and then deletes a project using onClick", () => {
		render(<IndividualProject project={project} />)

		const { queryByTestId, getByText } = screen

		fireEvent.click(queryByTestId("delete-project"))
		expect(queryByTestId("project-delete-modal")).toBeTruthy()

		fireEvent.click(getByText("Delete"))
		expect(firebase.firestore.mock.calls.length).toEqual(1)
	})

	it("should render the delete overlay and then deletes a project when enter key is pressed on 'Delete'", () => {
		render(<IndividualProject project={project} />)
		const { queryByTestId, getByText } = screen

		fireEvent.keyDown(queryByTestId("delete-project"), {
			key: "Enter",
			code: 13
		})

		expect(queryByTestId("project-delete-modal")).toBeTruthy()

		fireEvent.click(getByText("Delete"))
		expect(firebase.firestore.mock.calls.length).toEqual(1)
	})

	it("should not render the delete overlay when other key is pressed on 'Delete'", () => {
		render(<IndividualProject project={project} />)
		const { queryByTestId } = screen

		fireEvent.keyDown(queryByTestId("delete-project"), {
			key: "a",
			code: 65
		})

		expect(queryByTestId("project-delete-modal")).toBeFalsy()
	})

	it("should render the delete overlay and cancel using onClick", () => {
		render(<IndividualProject project={project} />)
		const { queryByTestId, getByText } = screen

		fireEvent.click(queryByTestId("delete-project"))
    expect(queryByTestId("project-delete-modal")).toBeTruthy()

		fireEvent.click(getByText("Cancel"))
		expect(queryByTestId("project-delete-modal")).toBeFalsy()
	})

	it("should render the delete overlay and cancel when enter key is pressed on 'Cancel'", () => {
		render(<IndividualProject project={project} />)
		const { queryByTestId, getByText } = screen

		fireEvent.click(queryByTestId("delete-project"))
		expect(queryByTestId("project-delete-modal")).toBeTruthy()

		fireEvent.keyDown(getByText("Cancel"), {
			key: "Enter",
			code: 13
		})
		expect(queryByTestId("project-delete-modal")).toBeFalsy()
	})

	it("should not render the delete overlay and cancel when other key is pressed on 'Cancel'", () => {
		render(<IndividualProject project={project} />)

		const { queryByTestId, getByText } = screen

		fireEvent.click(queryByTestId("delete-project"))
		expect(queryByTestId("project-delete-modal")).toBeTruthy()

		fireEvent.keyDown(getByText("Cancel"), {
			key: "a",
			code: 65
		})
		expect(queryByTestId("project-delete-modal")).toBeTruthy()
	})
})
