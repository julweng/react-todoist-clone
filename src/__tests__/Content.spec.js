import React from 'react'
import { render, screen } from "@testing-library/react"
import { Content } from "components/layout"

jest.mock("context", () => ({
	useSelectedProjectValue: jest.fn(() => ({
		setSelectedProject: jest.fn(() => "INBOX")
	})),
	useProjectsValue: jest.fn(() => ({
		projects: []
	}))
}))

describe("Content", () => {
  it("should render Content", () => {
    render(<Content />)
    expect(screen.getByTestId("content")).toBeTruthy()
  })

  it("should render Sidebar", () => {
    render(<Content />)
    expect(screen.getByTestId("sidebar")).toBeTruthy()
  })

  it("should render Tasks", () => {
    render(<Content />)
    expect(screen.getByTestId("tasks")).toBeTruthy()
  })
})
