export interface Post {
    title: string;
    content: string;
    userId: string;
    date: string;
    reactions?: Record<string, number>; // Assuming reactions is an object with reaction types as keys and counts as values
}

export interface PostExerptProps {
    post: Post;
}

export interface ReactionButtonProps {
    post: {
        reactions?: Record<string, number>;
    };
}