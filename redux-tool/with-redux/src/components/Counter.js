import { useState } from "react"
import { useSelector } from "react-redux"

const Counter = () => {
  const dataCounter = useSelector((state) => state.count.value)

  return (
    <h2>{dataCounter}</h2>
  )
}

export default Counter