import './App.css';
import React, {useState} from 'react'
import axios from 'axios'
/*
Here are the features it should have:

• Functioning Upvote and Downvote controls

 

Reddit’s API is public and you don’t need a key. You can use static data from e.g. http://www.reddit.com/r/reactjs.json


*/

const baseUrl = " http://www.reddit.com/r/reactjs.json"

function Voting(post) {
  let score = post.post.post.data.score
  return (
    <>
        <button>Up</button>
        <br/><span>{score}</span><br/>
        <button>Down</button>
    </>
  )
}

function PostDisplay(post) {
  return (
    <>
      <div className="grid-container">
        <div className="grid-child">
          <Voting post={post}/>
        </div>
        <div className="grid-child">
          <a href={post.post.data.url}>{post.post.data.title}</a><br/>
          <span>Submitted by </span><span className="author">{post.post.data.author}</span><br/>
          <span className="comments">{post.post.data.num_comments} Comments</span>
          <span className="notImportant"> Share Save Hide Report Pocket</span>
          <br/><br/>
        </div>
      </div>
    </>
  )
}

function App() {
  const [posts, setPosts] = useState()

  const handleClick = () => {
    axios.get(baseUrl).then((response) => {
    setPosts((response.data.data.children).sort((a,b) => { return b.data.score - a.data.score}))
  })
}

  return (
    <div>
      <button onClick={handleClick}>Fetch Posts</button>
      {posts!== undefined ? (posts.map((post) => (<PostDisplay post={post}/>))) : (null)}
    </div>
  );
}

export default App;
