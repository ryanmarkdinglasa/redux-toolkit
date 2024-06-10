import { useDispatch } from "react-redux"
import { reactionAdded } from "."
import { AppDispatch } from '../../store';
import { ReactionButtonProps } from '../../shared'

const reactionEmoji = {
    like: '👍🏽',
    wow: '😮',
    heart: '🤍'
};

export const ReactionButton: React.FC<ReactionButtonProps> = ({ post }:any) => {
    //const reactions = post.reactions || {}; // Default to an empty object if reactions is undefined
    const dispatch: AppDispatch = useDispatch();
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button key={name} type="button"
        className="reactionButton"
                onClick={() =>
                    dispatch(reactionAdded({ postId: post.id, reaction: name }))
                }>
            {emoji} {name}
        </button>
    ));

    return <div>{reactionButtons}</div>;
};