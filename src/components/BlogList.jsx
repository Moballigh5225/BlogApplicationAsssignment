import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogRequest,
  setSortOrder,
  setFilterText,
} from "../actions/blogActions";

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs, sortingOrder, filterText, loading, error } = useSelector(
    (state) => state.blog
  );

  const [tagFilter, setTagFilter] = useState("");

  useEffect(() => {
    dispatch(fetchBlogRequest());
  }, [dispatch]);

  const handleSortChange = (e) => {
    dispatch(setSortOrder(e.target.value));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilterText(e.target.value));
  };

  const handleTagFilterChange = (e) => {
    setTagFilter(e.target.value);
  };

  const sortedBlogs = [...blogs].sort((a, b) => {
    if (sortingOrder === "asc") {
      return a.title.localeCompare(b.title);
    }
    return b.title.localeCompare(a.title);
  });

  const filteredBlogs = sortedBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(filterText.toLowerCase()) &&
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(tagFilter.toLowerCase())
      )
  );

  // Unique tags for autocomplete
  const uniqueTags = [...new Set(blogs.flatMap((blog) => blog.tags))];

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Blog List</h1>

      <div className="d-flex mb-3 justify-content-center">
        <input
          type="text"
          value={filterText}
          onChange={handleFilterChange}
          className="form-control me-2"
          placeholder="Filter blogs by title"
        />
        <input
          type="text"
          value={tagFilter}
          onChange={handleTagFilterChange}
          className="form-control me-2"
          placeholder="Filter blogs by tags (autocomplete)"
          list="tags"
        />
        <datalist id="tags">
          {uniqueTags.map((tag) => (
            <option key={tag} value={tag} />
          ))}
        </datalist>
        <select
          className="form-select ms-2"
          onChange={handleSortChange}
          value={sortingOrder}
        >
          <option value="asc">Sort by Title (A-Z)</option>
          <option value="desc">Sort by Title (Z-A)</option>
        </select>
      </div>

      {loading ? (
        <p>Loading Blogs...</p>
      ) : error ? (
        <p className="text-danger">Error: {error}</p>
      ) : (
        <div className="row">
          {filteredBlogs.map((blog) => (
            <div className="col-md-4 mb-4" key={blog.id}>
              <div className="card shadow-sm border-light">
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.body.substring(0, 100)}...</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {blog.tags.map((tag) => (
                        <span className="badge bg-primary me-1" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div>
                      {Object.entries(blog.reactions).map(([key, value]) => (
                        <span className="badge bg-secondary me-1" key={key}>
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={`/blogs/${blog.id}`}
                    className="btn btn-primary mt-3"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
