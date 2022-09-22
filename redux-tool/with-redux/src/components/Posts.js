import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/actions/Posts.action";

const Posts = () => {
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  if (error !== null) {
    return <p>Ups! ocurrió un error. Error: {error}</p>
  }

  return (
    <>
      <h1>Esta es un componente que va a tener los posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((item) => {
          return (
            <div key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          )
        })
      )}
    </>
  )
}

export default Posts