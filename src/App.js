import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes } from "react-router-dom";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useEffect } from "react";
import { useStoreActions } from "easy-peasy";

function App() {
	const setPosts = useStoreActions((actions) => actions.setPosts);

	const { data, fetchError, isLoading } = useAxiosFetch(
		"http://localhost:3500/posts"
	);

	useEffect(() => {
		setPosts(data);
	}, [data, setPosts]);

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route
					index
					element={<Home isLoading={isLoading} fetchError={fetchError} />}
				></Route>
				<Route path="post" element={<NewPost />} />
				<Route path="post/:id" element={<PostPage />} />
				<Route path="edit/:id" index element={<EditPost />} />
				<Route path="about" element={<About />} />
				<Route path="*" element={<Missing />} />
			</Route>
		</Routes>
	);
}

export default App;
