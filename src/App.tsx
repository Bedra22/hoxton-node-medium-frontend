
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then(resp => resp.json())
      .then(postsFromServere => setAllPosts(postsFromServere))
  }, [])

  return (
    <div className="App">
      <h1>Medium BLOG</h1>
      <div className='all-posts'>
        <ul>
          {allPosts.map(item => (
            <li>
              <div className='user-part' >
                <img src={item.Users.image} />
                <h3>{item.Users.name}</h3>
              </div>
              <div className='post-content'>
                <img src={item.imageContent} />
                <p>{item.writenContent}</p>
              </div>
              <div className='like-comment'>
                {/* <div>{item.comment}</div> */}
                <h4>{item.likesInTotal}</h4>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
