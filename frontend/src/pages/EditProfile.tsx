// src/pages/EditProfile.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const EditProfile = () => {
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    // otros campos
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post('/api/edit-profile', userData)
      .then(response => {
        // Maneja la respuesta y muestra un mensaje de éxito
      })
      .catch(error => {
        // Maneja el error y muestra un mensaje de error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        value={userData.name}
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="Email"
        value={userData.email}
        onChange={handleChange}
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default EditProfile;
