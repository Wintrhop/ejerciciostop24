import { useSelector } from "react-redux"

const Text = () => {
  const username = useSelector(state => state.text.userName)

  return (
    <h2>{username}</h2>
  )
}

export default Text