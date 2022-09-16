import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
type EachPost = {
    id: number;
    imageContent: string;
    writenContent: string;
    usersId: number;
    likesInTotal: number;
    comment: Comment[];
}

type Comment = {
    id: number;
    content: string;
    postsId: number;
}
export function EachPosts() {
    const [eachPost, setEachPost] = useState<null | EachPost>()
    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:5000/posts/${params.id}`)
            .then(resp => resp.json())
            .then(eachPostFromServer => setEachPost(eachPostFromServer))
    }, [])
    return (
        <div className="each-post">
            <div className="user-part">
                <img src={eachPost?.Users.image} />
                <h3>{eachPost?.Users.name}</h3>
            </div>
            <div className="post-content">
                <img src={eachPost?.imageContent} />
                <p>{eachPost?.writenContent}</p>
            </div>
            <div className='like-comment'>
                <h4>💗 {eachPost?.likesInTotal}</h4>
                <h4>{eachPost?.comment.length} Comments</h4>
            </div>
            <div className='get-comment'>
                {eachPost?.comment.map(commentForPost => (
                    <li>
                        {/* I forgot to add the users at prisma if I have time I will fix it */}
                        <h3>Users: {commentForPost.content}</h3>
                    </li>
                ))}
            </div>
            <form
                className='add-comment'
                onSubmit={event => {
                    event.preventDefault()
                    fetch("http://localhost:5000/comments", {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            content: event.target.content.value,
                            postsId: eachPost.id
                        })
                    })
                        .then(resp => resp.json())
                        .then(updatedomments => setEachPost(updatedomments))
                }}
            >
                <div className='new-comment-input'>
                    <textarea name="content"
                        cols={30}
                        rows={1}>
                    </textarea>
                    <button>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}