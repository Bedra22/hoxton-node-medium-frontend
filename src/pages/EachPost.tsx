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
        <div>
            <h1>
                {eachPost?.id}
            </h1>
        </div>
    )
}