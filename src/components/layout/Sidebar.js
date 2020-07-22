import React, { useState } from "react"
import {
	FaChevronDown,
	FaInbox,
	FaRegCalendarAlt,
	FaRegCalendar
} from "react-icons/fa"
import { useSelectedProjectValue } from "context"
import { AddProject, Projects } from "components"

export const Sidebar = () => {
	const { setSelectedProject } = useSelectedProjectValue()
	const [active, setActive] = useState("inbox")
	const [showProjects, setShowProjects] = useState(true)

	const handleListItemClick = activeType => {
		setActive(activeType)
		setSelectedProject(activeType.toUpperCase())
	}

	const handleChevronClick = () => setShowProjects(!showProjects)

	return (
		<div className="sidebar" data-testid="sidebar">
			<ul className="sidebar__generic">
				<li
					data-testid="inbox"
					className={active === "inbox" ? "active" : undefined}
				>
					<div
						data-testid="inbox-action"
						aria-label="show inbox tasks"
						tabIndex={0}
						role="button"
						onClick={() => handleListItemClick("inbox")}
						onKeyDown={e => {
							if (e.key === "Enter") {
								handleListItemClick("inbox")
							}
						}}
					>
						<span>
							<FaInbox />
						</span>
						<span>Inbox</span>
					</div>
				</li>
				<li
					data-testid="today"
					className={active === "today" ? "active" : undefined}
				>
					<div
						data-testid="today-action"
						aria-label="show today's tasks"
						tabIndex={0}
						role="button"
						onClick={() => handleListItemClick("today")}
						onKeyDown={e => {
							if (e.key === "Enter") handleListItemClick("today")
						}}
					>
						<span>
							<FaRegCalendar />
						</span>
						<span>Today</span>
					</div>
				</li>
				<li
					data-testid="next_7"
					className={active === "next_7" ? "active" : undefined}
				>
					<div
						data-testid="next_7-action"
						aria-label="show tasks for the next 7 days"
						tabIndex={0}
						role="button"
						onClick={() => handleListItemClick("next_7")}
						onKeyDown={e => {
							if (e.key === "Enter") handleListItemClick("next_7")
						}}
					>
						<span>
							<FaRegCalendarAlt />
						</span>
						<span>Next 7 days</span>
					</div>
				</li>
			</ul>
			<div 
        className="sidebar__middle" 
        aria-label="show/hide projects"
        onClick={() => handleChevronClick()}
        onKeyDown={(e) => {if (e.key==="Enter") handleChevronClick()}}
        role="button"
        tabIndex={0}
      >
				<span>
					<FaChevronDown
						className={!showProjects ? "hidden-projects" : undefined}
					/>
				</span>
				<h2>Projects</h2>
			</div>
			<ul className="sidebar__projects">{showProjects && <Projects />}</ul>
			{showProjects && <AddProject />}
		</div>
	)
}
