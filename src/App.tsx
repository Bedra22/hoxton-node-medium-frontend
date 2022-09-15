
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [allPosts, setAllPosts] = useState([])
  const [commentsOnPosts, setCommentsOnPosts] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then(resp => resp.json())
      .then(postsFromServere => setAllPosts(postsFromServere))
  }, [])

  useEffect(() => {
    fetch("http://localhost:5000/comments")
      .then(resp => resp.json())
      .then(commentsFromServers => setCommentsOnPosts(commentsFromServers))
  }, [])

  return (
    <div className="App">
      <h1 className='h1-title'>Medium BLOG</h1>
      <div className='first-part'>
        <div className='left-part'>
          <h1>Stay curious.</h1>
          <p>Discover stories, thinking, and expertise from writers on any topic.</p>
        </div>
        <div className='right-part'>
          <img src="https://images.pexels.com/photos/266583/pexels-photo-266583.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" />
        </div>
      </div>
      <div className='all-posts'>
        <ul>
          {allPosts.map(item => (
            <li className='all-posts-li'>
              <div className='user-part' >
                <img src={item.Users.image} />
                <h3>{item.Users.name}</h3>
              </div>
              <div className='post-content'>
                <img src={item.imageContent} />
                <p>{item.writenContent}</p>
              </div>
              <div className='like-comment'>
                <h4>💗 {item.likesInTotal}</h4>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
