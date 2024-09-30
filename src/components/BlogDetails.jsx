import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchBlogDetailsSuccess,
  fetchBlogDetailsFailure,
} from "../actions/blogActions";

const BlogDetails = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();

  const { blogDetails, error, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/posts/${blogId}`);
        const data = await response.json();
        dispatch(fetchBlogDetailsSuccess(data));
      } catch (error) {
        dispatch(fetchBlogDetailsFailure(error.message));
      }
    };
    fetchBlogDetails();
  }, [blogId, dispatch]);

  return (
    <div>
      {loading ? (
        <p>Loading blog details...</p>
      ) : error ? (
        <p className="text-danger">Error: {error}</p>
      ) : (
        <div>
          <h1>{blogDetails.title}</h1>
          <p>{blogDetails.body}</p>
          <p>
            <strong>Author ID: {blogDetails.userId}</strong>
          </p>
          <p>
            <strong>Tags:</strong> {blogDetails.tags.join(", ")}
          </p>
          <p>
            <strong>Reactions:</strong>
          </p>
          <ul>
            {Object.entries(blogDetails.reactions).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
