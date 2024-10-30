// src/components/AuthForm.js
import { useState } from 'react';

const AuthForm = ({ onSubmit, buttonText }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [goal, setGoal] = useState('');
    const [dietaryPreferences, setDietaryPreferences] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            email,
            password,
            fullName,
            username,
            height,
            weight,
            birthDate,
            goal,
            dietaryPreferences,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Full Name:</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Height (cm):</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
            </div>
            <div>
                <label>Weight (kg):</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            </div>
            <div>
                <label>Birth Date:</label>
                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
            </div>
            <div>
                <label>Goal:</label>
                <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} required />
            </div>
            <div>
                <label>Dietary Preferences:</label>
                <input type="text" value={dietaryPreferences} onChange={(e) => setDietaryPreferences(e.target.value)} required />
            </div>
            <button type="submit">{buttonText}</button>
        </form>
    );
};

export default AuthForm;
