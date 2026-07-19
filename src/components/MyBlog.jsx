import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function MyBlog() {
    const [blogs, setBlogs] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                await axios.get('http://localhost:3000/api/blog', {
                    withCredentials: true
                }).then((response) => {
                    setBlogs(response.data.data);
                });
            } catch (err) {
                console.log(err);
            }
        }

        fetchBlogs();
    }, [blogs]);

    const deleteBlog = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/blog/${id}`).then((response) => {
                setMsg(response.data.message);
            });
        } catch(err) {
            setMsg(err.message);
        }
    }

    return (
        <div>
            {msg ?? (<p>{msg}</p>)}
            <h1>My Blog</h1>
            {blogs.length > 0 ? 
                blogs.map((blog) => (
                    <div key={blog._id}>
                        <h2>{blog.title}</h2>
                        <p>{blog.content}</p>
                        <Link onClick={() => deleteBlog(blog._id)}>Delete</Link>
                    </div>
                ))
            : (<p>No blogs found.</p>)}
        </div>
    )
}