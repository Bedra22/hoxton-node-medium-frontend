import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

type allPosts = {
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

export function AllPosts() {

    const [allPosts, setAllPosts] = useState<allPosts[]>([])
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
        <div className='all-posts'>
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
                    </li>
                ))}
            </ul>
        </div>
    )
}