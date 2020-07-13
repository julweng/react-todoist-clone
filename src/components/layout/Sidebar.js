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

  const handleListItemClick = (activeType) => {
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
          onClick={() => handleListItemClick("inbox")}
        >
					<span>
						<FaInbox />
					</span>
					<span>Inbox</span>
				</li>
				<li
        data-testid="today"
          className={active === "today" ? "active" : undefined}
          onClick={() => handleListItemClick("today")}
        >
					<span>
						<FaRegCalendar />
					</span>
					<span>Today</span>
				</li>
				<li
        data-testid="next_7"
          className={active === "next_7" ? "active" : undefined}
          onClick={() => handleListItemClick("next_7")}
        >
					<span>
						<FaRegCalendarAlt />
					</span>
					<span>Next 7 days</span>
				</li>
			</ul>
      <div className="sidebar__middle" onClick={() => handleChevronClick()}>
        <span><FaChevronDown className={!showProjects ? "hidden-projects" : undefined} /></span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">
        {showProjects && <Projects />}
      </ul>
      <AddProject />
		</div>
	)
}
