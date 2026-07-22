import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function UpdatePost() {
    const { postid } = useParams();
    const [post, setPost] = useState({
        title: "",
        content: ""
    });
    const [msg, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [successmsg, setSuccessmsg] = useState("");


    useEffect(() => {
        const fetchPost = async () => {
            try {
                await axios.get(`http://localhost:3000/api/blog/${postid}`, {
                    withCredentials: true
                }).then((response) => {
                    setPost(response.data.data);
                    if (!response.data.success) {
                        setMessage(response.data.message);
                    }
                });
            } catch (err) {
                setMessage(err.message);
            }
        }

        fetchPost();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!post.title.trim()) {
            setMessage('');
            newErrors.title = 'Title is required';
        }

        if (!post.content.trim()) {
            setMessage('');
            newErrors.content = 'Content is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await axios.put(`http://localhost:3000/api/blog/${postid}`, post).then((response) => {
                setErrors({});
                setSuccessmsg(response.data.message);
            });
        } catch (err) {
            setMessage(err.message);
        }
    }

    return (
        <>
            {successmsg && (<p style={{ color: "green" }}>{successmsg}</p>)}
            {msg ? (<p>{msg}</p>) :
                (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title">Title: </label>
                            <input
                                type="text"
                                name="title"
                                value={post.title}
                                onChange={(e) => setPost({ ...post, title: e.target.value })} />
                            {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
                        </div>
                        <div>
                            <label htmlFor="post">Post: </label>
                            <textarea
                                name="post"
                                value={post.content}
                                onChange={(e) => setPost({ ...post, content: e.target.value })} />
                            {errors.content && <p style={{ color: 'red' }}>{errors.content}</p>}
                        </div>
                        <input type="submit" value="Update" />
                    </form>
                )
            }
        </>
    );
}