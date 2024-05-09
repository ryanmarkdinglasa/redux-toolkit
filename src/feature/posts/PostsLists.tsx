import { useSelector } from "react-redux";
import { selectAllPosts, PostAuthor, TimeAgo } from ".";

export const PostsLists = () => {
    const posts = useSelector(selectAllPosts) || []; // Ensure posts is defined

    const orderedPosts = posts.slice().sort((a: { date: string; }, b: { date: string; }) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map((post:any) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId ={post.userId}/> 
                <TimeAgo timestamp={post.date}/>
            </p>
        </article>
    ));

    return (
        <>
            <section>
                <h2>Posts</h2>
                { renderedPosts }
            </section>
        </>
    );
};
