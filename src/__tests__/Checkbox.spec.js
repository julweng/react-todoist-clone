import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { Checkbox } from "components"
import { firebase } from "../firebase"

jest.mock("../firebase", () => ({
	firebase: {
		firestore: jest.fn(() => ({
			collection: jest.fn(() => ({
				doc: jest.fn(() => ({
					update: jest.fn()
				}))
			}))
		}))
	}
}))

describe("Checkbox", () => {
  afterEach(() => jest.clearAllMocks())

	it("should render Checkbox", () => {
		render(<Checkbox />)
		expect(screen.getByTestId("checkbox-action")).toBeTruthy()
	})

	it("should accept onClick to archive task", () => {
		render(<Checkbox />)
		expect(firebase.firestore.mock.calls.length).toEqual(0)

		const box = screen.getByTestId("checkbox-action")

		fireEvent.click(box)
		expect(firebase.firestore.mock.calls.length).toEqual(1)
	})

	it("should accept pressing of enter key to archive task", () => {
		render(<Checkbox />)
		expect(firebase.firestore.mock.calls.length).toEqual(0)

		const box = screen.getByTestId("checkbox-action")

		fireEvent.keyDown(box, {
			key: "Enter",
			code: 13
		})

		expect(firebase.firestore.mock.calls.length).toEqual(1)
	})

	it("should not accept pressing of other key to archive task", () => {
		render(<Checkbox />)
		expect(firebase.firestore.mock.calls.length).toEqual(0)

		const box = screen.getByTestId("checkbox-action")

		fireEvent.keyDown(box, {
			key: "a",
			code: 65
		})

		expect(firebase.firestore.mock.calls.length).toEqual(0)
	})
})
