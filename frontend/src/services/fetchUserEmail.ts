import axios from 'axios';
import { getUserEmail } from '../utils/getUserEmail';

export async function fetchUserEmail(): Promise<string | null> {
    const token = localStorage.getItem('token'); 
    if (!token) {
        console.error('No token found');
        return null;
    }

    try {
        const email = await getUserEmail(token); 
        if (email) {
            console.log(`User email: ${email}`);
            return email;
        }
    } catch (error) {
        console.error('Error fetching user email:', error);
    }

    return null;
}

