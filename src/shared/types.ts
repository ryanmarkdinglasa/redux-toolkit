export interface Post {
    id: string;
    title: string;
    content: string;
    userId: number;
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

export interface PostState {
    posts: any[];
    status: string;
    error: string | null;
}

export interface UserState {
    users: any[];
    status: string;
    error: string | null;
}

export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    address?: Record<string, any>;
    phone: string;
    website: string;
    company: any;
}