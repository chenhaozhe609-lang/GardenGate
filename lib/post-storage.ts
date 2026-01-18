import type { Post } from '@/types/post';

// In-memory storage for demo purposes
// In production, this would be replaced with a database
const posts: Map<string, Post> = new Map();

export function generatePostId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function savePost(post: Post): void {
    posts.set(post.id, post);
}

export function getPost(id: string): Post | undefined {
    return posts.get(id);
}

export function getAllPosts(): Post[] {
    return Array.from(posts.values()).sort((a, b) => b.createdAt - a.createdAt);
}

export function deletePost(id: string): boolean {
    return posts.delete(id);
}
