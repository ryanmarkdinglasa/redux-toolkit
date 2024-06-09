import { useDispatch } from "react-redux"
import { reactionAdded } from "."

const reactionEmoji = {
    like: '👍🏽',
    wow: '😮',
    heart: '🤍'
};

export const ReactionButtons = ({posts}:any) => {
    const dispatch = useDispatch();
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <>
                <button 
                    key ={name} 
                    type = "button" 
                    className="reactionButton"
                    onClick = { () => dispatch(reactionAdded({postsId: posts.id, reaction: name}))}
                >
                    {emoji} {posts.reactions[name]}
                </button>
            </>
        );
    })
    return <div>{reactionButtons}</div>
}
