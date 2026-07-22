import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetails() {
    const { postid } = useParams();
    const [details, setDetails] = useState({});

    useEffect(() => {
        const blogDetails = async () => {
            try {
                await axios.get(`http://localhost:3000/api/blog/details/${postid}`).then((response) => {
                    console.log(response.data.data);
                    setDetails(response.data.data);
                });
            } catch (error) {
                console.error(error);
            }
        }

        blogDetails();
    }, []);

    if (!details.author) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{details.title}</h1>
            <p>author: @{details.author?.username}</p>
            <p>{details.content}</p>
        </div>
    );
}