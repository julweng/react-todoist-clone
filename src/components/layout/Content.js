import React from 'react'
import { Sidebar } from "."
import { Tasks } from "components"

export const Content = () => {
  return (
    <section className="content">
      <Sidebar />
      <Tasks />
    </section>
  )
}
