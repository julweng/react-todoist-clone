import React from "react"
import { Sidebar } from "."
import { Tasks } from "components"

export const Content = () => {
	return (
		<section className="content" data-testid="content">
			<Sidebar />
			<Tasks />
		</section>
	)
}
