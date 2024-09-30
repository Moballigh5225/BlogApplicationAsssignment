export const fetchBlogRequest = () => ({
  type: "FETCH_BLOGS_REQUEST",
});

export const fetchBlogSuccess = (blogs) => ({
  type: "FETCH_BLOGS_SUCCESS",
  payload: blogs,
});

export const fetchBlogsFailure = (error) => ({
  type: "FETCH_BLOGS_FAILURE",
  error: error,
});

export const fetchBlogDetailsSuccess = (details) => ({
  type: "FETCH_BLOGS_DETAILS_SUCCESS",
  payload: details,
});

export const fetchBlogDetailsFailure = (error) => ({
  type: "FETCH_BLOGS_DETAILS_FAILURE",
  error: error,
});

export const setSortOrder = (order) => ({
  type: "SET_SORT_ORDER",
  payload: order,
});

export const setFilterText = (text) => ({
  type: "SET_FILTER_TEXT",
  payload: text,
});
