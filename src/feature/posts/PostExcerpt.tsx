import { PostAuthor, TimeAgo, ReactionButton } from '.'
import { PostExerptProps } from '../../shared';

export const PostExerpt: React.FC<PostExerptProps> = ({ post }: any) => {
    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.content ? post.content.substring(0, 100) : 'No content available'}</p>
            <p className='postCredit'>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButton post={post} />
        </article>
    );
};