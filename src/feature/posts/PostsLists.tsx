import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, PostExerpt } from ".";
import { useEffect } from "react";
import { AppDispatch, RootState } from '../../store';


export const PostsLists = () => {
    const dispatch: AppDispatch = useDispatch();
    const postsStatus = useSelector((state: RootState) => state.posts.status);
    const posts = useSelector((state: RootState) => state.posts.posts) || [];
    const error = useSelector((state: RootState) => state.posts.error) || []; 
    
    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postsStatus, dispatch])
    
    let content:any, orderedPosts:any;
    switch (postsStatus) {
        case 'loading':
            content = <p>"Loading..."</p>
            break;
        case 'succeeded':
            orderedPosts = posts.slice().sort((a: { date: string; }, b: { date: string; }) => b.date.localeCompare(a.date));
            content = orderedPosts.map((post:any) => <PostExerpt key = {post.id} post={post} />)
            break;
        case 'failed':
            content = <p>{error}</p>
            break;
        default:
            content = <p>"Something went wrong"</p>
            break;
    }

    return (
        <>
            <section>
                <h2>Posts</h2>
                { content }
            </section>
        </>
    );
};
