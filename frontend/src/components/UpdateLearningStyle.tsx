// src/components/UpdateLearningStyle.tsx
import React, { useState, FormEvent } from 'react';
import axios from 'axios';

const UpdateLearningStyle: React.FC = () => {
    const [studentId, setStudentId] = useState<string>('');
    const [learningStyle, setLearningStyle] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/api/students/updateLearningStyle', {
                studentId,
                learningStyle
            });
            console.log('Learning style updated:', response.data);
        } catch (error: any) {
            console.error('Error updating learning style:', error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Student ID:</label>
                <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
            </div>
            <div>
                <label>Learning Style:</label>
                <input type="text" value={learningStyle} onChange={(e) => setLearningStyle(e.target.value)} required />
            </div>
            <button type="submit">Update Learning Style</button>
        </form>
    );
};

export default UpdateLearningStyle;
