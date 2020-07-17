import React from "react"
import { render, screen } from "@testing-library/react"
import { App } from "App"

const createProps = ({ darkModeDefault = false } = {}) => ({ darkModeDefault })

describe("App", () => {
	it("Renders the app with non-darkmode by default", () => {
    render(<App />)
		expect(screen.getByTestId("application")).not.toHaveClass("darkmode")
  })
  
  it("Renders the app with darkmode if the mode is activated", () => {
    const props = createProps({ darkModeDefault: true })
    render(<App {...props} />)
    console.log(props)
		expect(screen.getByTestId("application")).toHaveClass("darkmode")
  })
})
