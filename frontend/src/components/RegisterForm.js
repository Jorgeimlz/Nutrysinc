// src/components/RegisterForm.js
import { useState } from 'react';
import styles from './RegisterForm.module.css';

const RegisterForm = ({ onSubmit, buttonText }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [goal, setGoal] = useState('');
    const [dietaryPreferences, setDietaryPreferences] = useState('');
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('user');

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
            gender,
            role
        });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Crea tu cuenta</h2>
            <div className={styles.formGrid}>
                <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
                    <label className={styles.label}>Correo Electrónico</label>
                    <input
                        type="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
                    <label className={styles.label}>Contraseña</label>
                    <input
                        type="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Nombre Completo</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Nombre de Usuario</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Estatura (cm)</label>
                    <input
                        type="number"
                        className={styles.input}
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Peso (kg)</label>
                    <input
                        type="number"
                        className={styles.input}
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Fecha de Nacimiento</label>
                    <input
                        type="date"
                        className={styles.input}
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Género</label>
                    <select
                        className={styles.select}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="">Seleccione Género</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="other">Otro</option>
                    </select>
                </div>
                <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
                    <label className={styles.label}>Objetivo</label>
                    <select
                        className={styles.select}
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        required
                    >
                        <option value="">Seleccione Objetivo</option>
                        <option value="lose_weight">Bajar de Peso</option>
                        <option value="gain_weight">Ganar Peso</option>
                        <option value="maintain_weight">Mantener Peso</option>
                        <option value="build_muscle">Ganar Masa Muscular</option>
                    </select>
                </div>
                <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
                    <label className={styles.label}>Preferencias Alimenticias</label>
                    <select
                        className={styles.select}
                        value={dietaryPreferences}
                        onChange={(e) => setDietaryPreferences(e.target.value)}
                        required
                    >
                        <option value="">Seleccione Preferencia</option>
                        <option value="vegetarian">Vegetariano</option>
                        <option value="vegan">Vegano</option>
                        <option value="pescatarian">Pescatariano</option>
                        <option value="gluten_free">Sin Gluten</option>
                        <option value="keto">Keto</option>
                        <option value="no_preference">Sin Preferencias</option>
                    </select>
                </div>
            </div>
            <button type="submit" className={styles.button}>{buttonText}</button>
            <div className={styles.footerText}>
                ¿Ya tienes una cuenta? <a href="/login" className={styles.footerLink}>Iniciar sesión</a>
            </div>
        </form>
    );
};

export default RegisterForm;
