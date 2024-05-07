import { useSelector } from "react-redux";
import { selectAllPosts } from ".";

export const PostsLists = () => {
    const posts = useSelector(selectAllPosts) || []; // Ensure posts is defined

    const renderedPosts = posts.map((post:any) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
        </article>
    ));

    return (
        <>
            <section>
                <h2>Posts</h2>
                {renderedPosts}
            </section>
        </>
    );
};
