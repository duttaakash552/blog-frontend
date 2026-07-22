import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                await axios.get('http://localhost:3000/api/blog/all').then((response) => {
                    setBlogs(response.data.data);
                });
            } catch (error) {
                console.error(error);
            }
        }

        getBlogs();
    }, []);

    return (
        <div>
            <ul>
                {blogs.map((b) => {
                    const words = b.content.split(' ');

                    return (
                        <li key={b._id}>
                            <b>{b.title}</b>
                            <p>
                                {words.slice(0, 3).join(' ')}
                                {words.length > 3 ? '...' : ''}
                            </p>
                            <p>@{b.author.username}</p>
                            <Link to={`/blog-details/${b._id}`}>View</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}