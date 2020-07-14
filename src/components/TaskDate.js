import React from "react"
import { bool, func } from "prop-types"
import { format, addDays } from "date-fns"
import { FaRegPaperPlane, FaSpaceShuttle, FaSun } from "react-icons/fa"

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) => {
  const showDate = () => {
    setShowTaskDate(false)
		setTaskDate(format(new Date(), "dd/MM/yyyy"))
  }

  const showDateKeyDown = (e) => {
    if (e.key === "Enter") showDate()
  }

  const showTomorrowTaskDate = () => {
    setShowTaskDate(false)
    setTaskDate(format(addDays(new Date(), 1), "dd/MM/yyyy"))
  }

  const showTomorrowTaskDateKeyDown = (e) => {
    if (e.key === "Enter") showTomorrowTaskDate()
  }

  const showNextWeekTaskDate = () => {
    setShowTaskDate(false)
		setTaskDate(format(addDays(new Date(), 7), "dd/MM/yyyy"))
  }

  const showNextWeekTaskDateKeyDown = (e) => {
    if (e.key === "Enter") showNextWeekTaskDate()
  }

	return showTaskDate && (
		<div className="task-date" data-testid="task-date-overlay">
			<ul className="task-date__list">
				<li>
					<div
						onClick={() => showDate()}
						onKeyDown={e => showDateKeyDown(e)}
						data-testid="task-date-today"
						tabIndex={0}
						aria-label="Select today as the task date"
						role="button"
					>
						<span>
							<FaSpaceShuttle />
						</span>
						<span>Today</span>
					</div>
				</li>
				<li>
					<div
						onClick={() => showTomorrowTaskDate()}
						onKeyDown={e => showTomorrowTaskDateKeyDown(e)}
						data-testid="task-date-tomorrow"
						role="button"
						tabIndex={0}
						aria-label="Select tomorrow as the task date"
					>
						<span>
							<FaSun />
						</span>
						<span>Tomorrow</span>
					</div>
				</li>
				<li>
					<div
						onClick={() => showNextWeekTaskDate()}
						onKeyDown={e => showNextWeekTaskDateKeyDown(e)}
						data-testid="task-date-next-week"
						aria-label="Select next week as the task date"
						tabIndex={0}
						role="button"
					>
						<span>
							<FaRegPaperPlane />
						</span>
						<span>Next week</span>
					</div>
				</li>
			</ul>
		</div>
	)
}

TaskDate.propTypes = {
	setTaskDate: func,
	showTaskDate: bool,
	setShowTaskDate: func
}
