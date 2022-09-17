import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Header } from "../components/Header";

type allPosts = {
    id: number;
    imageContent: string;
    writenContent: string;
    usersId: number;
    likesInTotal: number;
    Users: User;
    comment: Comment[]
}
type User = {
    id: number;
    name: string;
    email: string;
    image: string;
}
type Comment = {
    id: number;
    content: string;
    postsId: number;
}

export function AllPosts() {

    const [allPosts, setAllPosts] = useState<allPosts[]>([])

    useEffect(() => {
        fetch("http://localhost:5000/posts")
            .then(resp => resp.json())
            .then(postsFromServere => setAllPosts(postsFromServere))
    }, [])


    return (
        <div>
            <Header />

            <div className='all-posts'>
                <form
                    className="add-posts"
                    onSubmit={event => {
                        event.preventDefault()
                        let newPost = {
                            imageContent: event.target.imageContent.value,
                            writenContent: event.target.writenContent.value,
                            likesInTotal: event.target.likesInTotal.value,
                            usersId: event.target.usersId.value
                        }
                        fetch("http://localhost:5000/posts", {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(newPost)
                        })
                            .then(resp => resp.json())
                            .then(updatedPosts => setAllPosts(updatedPosts))
                    }}
                >
                    <div className="new-posts-inputs">
                        <h1>Add a new Post</h1>
                        <div className="add-new-post">
                            <input
                                name="writenContent"
                                placeholder="Add written Content"
                            />
                            <input type="url"
                                name="imageContent"
                                placeholder="Add image URL"
                            />
                            <input type="number"
                                name="likesInTotal"
                                placeholder="Likes"
                            />
                            <input type="number"
                                name="usersId"
                                placeholder="Add users ID"
                            />
                        </div>
                        <button>Post</button>
                    </div>
                </form>
                <ul>
                    {allPosts.map(item => (
                        <li className='all-posts-li'>
                            <Link to={`/posts/${item.id}`}>
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
                                    <h4>{item.comment.length} Comments</h4>
                                </div>
                                <div className='get-comment'>
                                    {item.comment.map(commentForPost => (
                                        <li>
                                            {/* I forgot to add the users at prisma if I have time I will fix it */}
                                            <h3>Users: {commentForPost.content}</h3>
                                        </li>
                                    ))}
                                </div>
                            </Link>
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
                                            postsId: item.id
                                        })
                                    })
                                        .then(resp => resp.json())
                                        .then(updatedItems => setAllPosts(updatedItems))
                                }}
                            >
                                <div className='new-comment-input'>
                                    <textarea name="content"
                                        cols={30}
                                        rows={1}
                                        placeholder="Add a comment "
                                    >
                                    </textarea>
                                    <button>
                                        👆
                                    </button>
                                </div>

                            </form>
                        </li>
                    ))}
                </ul>
            </div>
        </div >

    )
}