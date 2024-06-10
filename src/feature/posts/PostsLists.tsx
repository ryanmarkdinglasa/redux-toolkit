import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, PostExerpt } from ".";
import { useEffect } from "react";
import { AppDispatch, RootState } from '../../store';
import { Post } from "../../shared";

export const PostsLists: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const postsStatus = useSelector((state: RootState) => state.posts.status);
    const posts:any = useSelector((state: RootState) => state.posts.posts) || [];
    const error = useSelector((state: RootState) => state.posts.error);

    let content, uniquePosts:any[] = [];
    if (posts || posts !== null) uniquePosts = posts.filter((post: { id: any; }, index: any, self: any[]) => index === self.findIndex((p) => p.id === post.id) );

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postsStatus, dispatch]);

    switch (postsStatus) {
        case 'loading':
            content = <p>"Loading..."</p>;
            break;
        case 'succeeded':
            const orderedPosts = uniquePosts.slice().sort((a:any, b:any) => b.date.localeCompare(a.date));
            content = orderedPosts.map((post: Post) => <PostExerpt key={post.id} post={post} />);
            break;
        case 'failed':
            content = <p>{error}</p>;
            break;
        default:
            content = <p>"Something went wrong"</p>;
            break;
    }

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    );
};