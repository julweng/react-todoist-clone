import React from "react"
import { Content, Header } from "components/layout"
import { ProjectsProvider, SelectedProjectProvider } from "context"
import "./App.scss"

export const App = () => {
	return (
		<ProjectsProvider>
			<SelectedProjectProvider>
				<div className="App">
					<Header />
					<Content />
				</div>
			</SelectedProjectProvider>
		</ProjectsProvider>
	)
}
