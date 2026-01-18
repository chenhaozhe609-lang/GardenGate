import { db } from '@/lib/firebase/config';
import { collection, doc, setDoc, getDoc, getDocs, deleteDoc, query, orderBy, limit } from 'firebase/firestore';
import type { Post } from '@/types/post';

const POSTS_COLLECTION = 'posts';

export function generatePostId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Save a post to Firestore
 */
export async function savePost(post: Post): Promise<void> {
    const postRef = doc(db, POSTS_COLLECTION, post.id);
    await setDoc(postRef, {
        ...post,
        createdAt: post.createdAt,
    });
}

/**
 * Get a single post by ID from Firestore
 */
export async function getPost(id: string): Promise<Post | undefined> {
    try {
        const postRef = doc(db, POSTS_COLLECTION, id);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
            return postSnap.data() as Post;
        }
        return undefined;
    } catch (error) {
        console.error('Error fetching post:', error);
        return undefined;
    }
}

/**
 * Get all posts from Firestore (sorted by creation date)
 */
export async function getAllPosts(limitCount: number = 50): Promise<Post[]> {
    try {
        const postsRef = collection(db, POSTS_COLLECTION);
        const q = query(postsRef, orderBy('createdAt', 'desc'), limit(limitCount));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => doc.data() as Post);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

/**
 * Delete a post from Firestore
 */
export async function deletePost(id: string): Promise<boolean> {
    try {
        const postRef = doc(db, POSTS_COLLECTION, id);
        await deleteDoc(postRef);
        return true;
    } catch (error) {
        console.error('Error deleting post:', error);
        return false;
    }
}
