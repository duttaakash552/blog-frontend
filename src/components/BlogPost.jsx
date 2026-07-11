import { useState, useContext } from "react"
import axios from "axios"

import { AuthContext } from "../AuthContext"

export default function BlogPost() {
    const { user, loading } = useContext(AuthContext);
    const [blog, setBlog] = useState({ title: '', content: '' });
    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!blog.title.trim()) {
            setMsg('');
            newErrors.title = 'Title is required';
        }

        if (!blog.content.trim()) {
            setMsg('');
            newErrors.content = 'Content is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/blog', blog, {
                withCredentials: true
            }).then((response) => {
                setMsg(response.data);
                setBlog({ title: '', content: '' });
                setErrors({});
            });
        } catch (error) {
            setMsg(error.response.data.message || 'An error occurred');
        }
    }

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1>Welcome, {user ? user.name : 'Guest'}</h1>
            <h2>Post your blog</h2>
            {(msg && !msg.success) ? <p style={{ color: 'red' }}>{msg}</p> : (msg && msg.success) ? <p style={{ color: 'green' }}>{msg.message}</p> : null}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} />
                    {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
                </div>
                <br></br>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea id="content" name="content" value={blog.content} onChange={(e) => setBlog({ ...blog, content: e.target.value })}></textarea>
                    {errors.content && <p style={{ color: 'red' }}>{errors.content}</p>}
                </div>
                <button type="submit">Post</button>
            </form>
        </div>
    )
}