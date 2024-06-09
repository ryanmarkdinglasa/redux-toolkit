import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from '.'
import { AppDispatch, RootState } from '../../store';

export const AddPostForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users);

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState(0)

    const onTitleChange = (e:any) => setTitle(e.target.value)
    const onContentChanged = (e:any) => {setContent(e.target.value)}
    const onAuthorChange = (e:any) => {setUserId(e.target.value)}

    const onSavedPostClick = () => {
        if (title && content){
            dispatch(postAdded(title, content, userId))
            setTitle('')
            setContent('')
            setUserId(0)
        }
    }

    const userOptions = users.map( (user:any) => (
        <option key={user.id} value={user.id}>
            { user.name}
        </option>
    ))

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    return (
        <>
            <section>
                <h2>Add a new Post</h2>
                <form>
                    <div>
                        <div>
                            <label htmlFor='postTitle'>Title: </label>
                        </div>
                        <div>
                            <input type='text' id='postTitle' name='postTitle' value={title} onChange={onTitleChange} required/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor='postContent'>Content: </label>
                        </div>
                        <div>
                            <textarea  id='postContent' name='postContent' value={content} onChange={onContentChanged} required/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor='postAuthor'>Author: </label>
                        </div>
                        <div>
                            <select id="postAuthor" value={userId} onChange={onAuthorChange}>
                                {userOptions}
                            </select>
                        </div>
                    </div>
                    <div>
                        <button type="button" className='button'onClick={onSavedPostClick} disabled={!canSave}> Save Post </button>
                    </div>
                </form>
            </section>
        </>
    )
}
