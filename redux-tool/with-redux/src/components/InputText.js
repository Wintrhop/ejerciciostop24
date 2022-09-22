import { useDispatch, useSelector } from "react-redux"
import { change_text } from "../store/reducers/Text.reducer"

const InputText = () => {
  const dispatch = useDispatch()
  const username = useSelector(state => state.text.userName)


  return (
    <input
      type={"text"}
      onChange={(e) => dispatch(change_text(e.target.value))}
      value={username}
    />
  )
}

export default InputText