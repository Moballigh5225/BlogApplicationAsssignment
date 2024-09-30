import { put, takeEvery, call } from "redux-saga/effects";
import {
  fetchBlogSuccess,
  fetchBlogDetailsFailure,
  fetchBlogDetailsSuccess,
  fetchBlogsFailure,
} from "../actions/blogActions";

function* fetchBlogs() {
  try {
    const response = yield call(() =>
      fetch("https://dummyjson.com/posts").then((res) => res.json())
    );
    yield put(fetchBlogSuccess(response.posts));
  } catch (error) {
    yield put(fetchBlogsFailure(error));
  }
}

function* fetchBlogDetails(action) {
  try {
    const { blogId } = action;
    const response = yield call(() =>
      fetch(`https://dummyjson.com/posts/${blogId}`).then((res) => res.json())
    );
    yield put(fetchBlogDetailsSuccess(response));
  } catch (error) {
    yield put(fetchBlogDetailsFailure(error));
  }
}

function* blogSaga() {
  yield takeEvery("FETCH_BLOGS_REQUEST", fetchBlogs);
  yield takeEvery("FETCH_BLOGS_DETAILS_REQUEST", fetchBlogDetails);
}

export default blogSaga;
