import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { format, addDays } from "date-fns"
import { TaskDate } from "components"

const createProps = ({ showTaskDate = true } = {}) => ({
	setTaskDate: jest.fn(),
	setShowTaskDate: jest.fn(),
	showTaskDate
})

const today = format(new Date(), "yyyy-MM-dd")
const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd")
const nextWk = format(addDays(new Date(), 7), "yyyy-MM-dd")

describe("TaskDate", () => {
	it("should render TaskDate when showTaskDate is true", () => {
		const props = createProps()
		render(<TaskDate {...props} />)

		const { queryByTestId } = screen
		expect(queryByTestId("task-date-overlay")).toBeTruthy()
	})

	it("should not render TaskDate when showTaskDate is false", () => {
		const props = createProps({ showTaskDate: false })
		render(<TaskDate {...props} />)

		const { queryByTestId } = screen
		expect(queryByTestId("task-date-overlay")).toBeFalsy()
	})

	it("should set date to today when today is clicked", () => {
		const props = createProps()
		render(<TaskDate {...props} />)

		const { queryByTestId } = screen
		fireEvent.click(queryByTestId("task-date-today"))

		expect(props.setShowTaskDate).toHaveBeenCalledWith(false)
		expect(props.setTaskDate).toHaveBeenCalledWith(today)
	})

	it("should set date to today when enter key is pressed on today", () => {
		const props = createProps()
		render(<TaskDate {...props} />)

		const { queryByTestId } = screen
		fireEvent.keyDown(queryByTestId("task-date-today"), {
			key: "Enter",
			code: 13
		})

		expect(props.setShowTaskDate).toHaveBeenCalledWith(false)
		expect(props.setTaskDate).toHaveBeenCalledWith(today)
	})

	it("should not set date to today when other key is pressed on today", () => {
		const props = createProps()
		render(<TaskDate {...props} />)

		const { queryByTestId } = screen
		fireEvent.keyDown(queryByTestId("task-date-today"), {
			key: "a",
			code: 65
		})

		expect(props.setShowTaskDate).not.toHaveBeenCalled()
		expect(props.setTaskDate).not.toHaveBeenCalled()
	})

	it("should set date to tomorrow when tomorrow is clicked", () => {
		const props = createProps()
		render(<TaskDate {...props} />)

		const { queryByTestId } = screen
		fireEvent.click(queryByTestId("task-date-tomorrow"))

		expect(props.setShowTaskDate).toHaveBeenCalledWith(false)
		expect(props.setTaskDate).toHaveBeenCalledWith(tomorrow)
	})

	it("should set date to tomorrow when enter key is pressed on tomorrow", () => {
		const props = createProps()
		render(<TaskDate {...props} />)

		const { queryByTestId } = screen
		fireEvent.keyDown(queryByTestId("task-date-tomorrow"), {
			key: "Enter",
			code: 13
		})

		expect(props.setShowTaskDate).toHaveBeenCalledWith(false)
		expect(props.setTaskDate).toHaveBeenCalledWith(tomorrow)
	})

	it("should not set date to today when other key is pressed on today", () => {
		const props = createProps()
		render(<TaskDate {...props} />)

		const { queryByTestId } = screen
		fireEvent.keyDown(queryByTestId("task-date-tomorrow"), {
			key: "a",
			code: 65
		})

		expect(props.setShowTaskDate).not.toHaveBeenCalled()
		expect(props.setTaskDate).not.toHaveBeenCalled()
  })
  
  it("should set date to next week when next week is clicked", () => {
		const props = createProps()
		render(<TaskDate {...props} />)

		const { queryByTestId } = screen
		fireEvent.click(queryByTestId("task-date-next-week"))

		expect(props.setShowTaskDate).toHaveBeenCalledWith(false)
		expect(props.setTaskDate).toHaveBeenCalledWith(nextWk)
	})

	it("should set date to next week when enter key is pressed on next week", () => {
		const props = createProps()
		render(<TaskDate {...props} />)

		const { queryByTestId } = screen
		fireEvent.keyDown(queryByTestId("task-date-next-week"), {
			key: "Enter",
			code: 13
		})

		expect(props.setShowTaskDate).toHaveBeenCalledWith(false)
		expect(props.setTaskDate).toHaveBeenCalledWith(nextWk)
	})

	it("should not set date to next week when other key is pressed on next week", () => {
		const props = createProps()
		render(<TaskDate {...props} />)

		const { queryByTestId } = screen
		fireEvent.keyDown(queryByTestId("task-date-next-week"), {
			key: "a",
			code: 65
		})

		expect(props.setShowTaskDate).not.toHaveBeenCalled()
		expect(props.setTaskDate).not.toHaveBeenCalled()
	})
})
