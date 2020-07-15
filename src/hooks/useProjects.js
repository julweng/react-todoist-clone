import { useEffect, useState } from "react"
import { firebase } from "../firebase"

export const useProjects = () => {
  const userId = process.env.REACT_APP_USER_ID

	const [projects, setProjects] = useState([])

	useEffect(() => {
		firebase
			.firestore()
			.collection("projects")
			.where("userId", "==", userId)
			.orderBy("projectId")
			.get()
			.then(snapshot => {
				const allProjects = snapshot.docs.map(project => ({
					...project.data(),
					docId: project.id
        }))
        
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects)
        }
      })
  }, [projects, userId])
  
  return { projects, setProjects }
}
