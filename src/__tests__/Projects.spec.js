import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Projects } from "components"

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

const createProps = ({ activeValue = null } = {}) => ({ activeValue })

describe("Projects", () => {
  afterEach(() => jest.clearAllMocks())

  it("should render projects", () => {
    const props = createProps()
    render(<Projects {...props} />)
    expect(screen.getAllByTestId("project-action-parent").length).toEqual(2)
  })

  it("should render IndividualProject", () => {
    const props = createProps()
    render(<Projects {...props} />)
    expect(screen.getAllByTestId("individual-project").length).toEqual(2)
  })

  it("should select an active project using onClick", () => {
    const props = createProps()
    render(<Projects {...props} />)
    
    const [firstContainer] = screen.getAllByTestId("project-action-parent")
    const [firstProject] = screen.getAllByTestId("project-action")

    expect(firstContainer).not.toHaveClass("active")
    
    userEvent.click(firstProject)
    expect(firstContainer).toHaveClass("active")
  })

  it("should select an active project using onKeyDown", () => {
    const props = createProps()
    render(<Projects {...props} />)
    
    const [firstContainer] = screen.getAllByTestId("project-action-parent")
    const [firstProject] = screen.getAllByTestId("project-action")

    expect(firstContainer).not.toHaveClass("active")
    
    fireEvent.keyDown(firstProject, {
      key: "a",
      code: 65
    })

    expect(firstContainer).not.toHaveClass("active")

    fireEvent.keyDown(firstProject, {
      key: "Enter",
      code: 13
    })

    expect(firstContainer).toHaveClass("active")
  })
})
