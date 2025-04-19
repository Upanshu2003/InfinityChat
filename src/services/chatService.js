import { db } from '../backend/firebase.config';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

export const chatService = {
    async getUserChats(userId) {
        const userChatsRef = collection(db, `users/${userId}/chats`);
        const querySnapshot = await getDocs(userChatsRef);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    },

    async createNewChat(userId, initialMessage) {
        const chatId = `chat_${Date.now()}`;
        const chatRef = doc(db, `users/${userId}/chats`, chatId);
        
        await setDoc(chatRef, {
            messages: [initialMessage],
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        return chatId;
    },

    async updateChat(userId, chatId, messages) {
        const chatRef = doc(db, `users/${userId}/chats`, chatId);
        await setDoc(chatRef, {
            messages,
            updatedAt: new Date()
        }, { merge: true });
    }
};
