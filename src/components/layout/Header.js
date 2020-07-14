import React, { useState } from "react"
import { bool, func } from "prop-types"
import { FaPizzaSlice } from "react-icons/fa"
import { AddTask } from "components"

export const Header = ({ darkMode, setDarkMode }) => {
	const [shouldShowMain, setShouldShowMain] = useState(false)
	const [showQuickAddTask, setShowQuickAddTask] = useState(false)

  const handleSetDarkMode = () => setDarkMode(!darkMode)
  
  const handleAdd = () => {
    setShouldShowMain(true)
    setShowQuickAddTask(true)
  }

	return (
		<header className="header" data-testid="header">
			<nav>
				<div className="logo">
					<img src="/images/logo.png" alt="Todoist" />
				</div>
				<div className="settings">
					<ul>
						<li 
              data-testid="quick-add-task-action"
              className="settings__add"
              onClick={() => handleAdd()}
            >
							+
						</li>
						<li
							data-testid="dark-mode-action"
							className="settings__darkmode"
							onClick={() => handleSetDarkMode()}
						>
							<FaPizzaSlice />
						</li>
					</ul>
				</div>
			</nav>
      <AddTask 
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
		</header>
	)
}

Header.propTypes = {
  darkMode: bool,
  setDarkMode: func
}
