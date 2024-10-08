// File: src/components/UserEmailDisplay.tsx (Frontend)

import React, { useEffect, useState } from 'react';
import { fetchUserEmail } from '../services/fetchUserEmail';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const UserEmailDisplay: React.FC = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const getEmail = async () => {
            const fetchedEmail = await fetchUserEmail();
            if (fetchedEmail) {
                setEmail(fetchedEmail);
                setError(false);
            } else {
                setError(true);
            }
            setLoading(false);
        };
        
        getEmail();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">Failed to load user email.</Alert>;
    }

    return (
        <div>
            <h2>User Email</h2>
            {email ? <p>Email: {email}</p> : <p>No email found.</p>}
        </div>
    );
};

export default UserEmailDisplay;
