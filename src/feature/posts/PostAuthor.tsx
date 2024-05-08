import { useSelector } from "react-redux";
import { selectAllUsers } from "..";

export const PostAuthor = ({ userId }: { userId: number }) => { 
    const users = useSelector(selectAllUsers);
    const author = users[userId]

    return (
        <span>by <b>{author ? author.name : 'Unknown author'}</b></span> 
    );
};
