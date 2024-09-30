const initialState = {
  blogs: [],
  blogDetails: null,
  loading: false,
  error: null,
  sortingOrder: "asc",
  filterText: "",
  tags: [],
  users: [],
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BLOGS_REQUEST":
      return { ...state, loading: true };

    case "FETCH_BLOGS_SUCCESS":
      return {
        ...state,
        loading: false,
        blogs: action.payload,
        tags: getUniqueTags(action.payload),
        users: getUniqueUsers(action.payload),
      };

    case "FETCH_BLOGS_FAILURE":
      return { ...state, loading: false, error: action.error };

    case "FETCH_BLOGS_DETAILS_REQUEST":
      return { ...state, loading: true };

    case "FETCH_BLOGS_DETAILS_SUCCESS":
      return { ...state, loading: false, blogDetails: action.payload };

    case "FETCH_BLOGS_DETAILS_FAILURE":
      return { ...state, loading: false, error: action.error };

    case "SET_SORT_ORDER":
      return { ...state, sortingOrder: action.payload };

    case "SET_FILTER_TEXT":
      return { ...state, filterText: action.payload };

    default:
      return state;
  }
};

const getUniqueTags = (blogs) => {
  const tagsSet = new Set();
  blogs.forEach((blog) => blog.tags.forEach((tag) => tagsSet.add(tag)));
  return Array.from(tagsSet);
};

const getUniqueUsers = (blogs) => {
  const usersSet = new Set();
  blogs.forEach((blog) => usersSet.add(blog.userId)); // Assuming userId is the field
  return Array.from(usersSet);
};

export default blogReducer;
