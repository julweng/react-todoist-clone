import React, { useState } from "react"
import { Content, Header } from "components/layout"
import { ProjectsProvider, SelectedProjectProvider } from "context"
import "./App.scss"

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault)

	return (
		<ProjectsProvider>
			<SelectedProjectProvider>
				<main
          data-testid="application"
          className={darkMode ? "darkmode" : undefined}
        >
					<Header darkMode={darkMode} setDarkMode={setDarkMode} />
					<Content /> 
				</main>
			</SelectedProjectProvider>
		</ProjectsProvider>
	)
}
