// src/components/UserProfile.tsx

import React, { useState, useEffect } from 'react';
//import { getUserEmail } from '../services/userService';
import { getUserEmail } from '../services/api';

const UserProfile: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await getUserEmail();
        setEmail(email);
      } catch (error) {
        setError('Failed to fetch user email');
      }
    };

    fetchUserEmail();
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {email ? <p>User Email: {email}</p> : <p>Loading...</p>}
    </div>
  );
};

export default UserProfile;