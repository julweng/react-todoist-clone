export const getTitle = (projects, projectId) =>
	projects.find(project => project.projectId === projectId)
