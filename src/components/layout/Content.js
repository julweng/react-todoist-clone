import React from 'react'
import { Sidebar } from "."
import { Tasks } from "components"

export const Content = () => {
  return (
    <section>
      <Sidebar />
      <Tasks />
    </section>
  )
}
