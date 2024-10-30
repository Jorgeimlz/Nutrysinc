// src/components/LoginForm.js
import { useState } from 'react';
import styles from './LoginForm.module.css';

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password });
    };

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.title}>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Correo Electrónico</label>
                    <input
                        type="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Contraseña</label>
                    <input
                        type="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.button}>Ingresar</button>
            </form>
            <div className={styles.footerText}>
                ¿No tienes una cuenta? <a href="/signup" className={styles.footerLink}>Regístrate</a>
            </div>
        </div>
    );
};

export default LoginForm;
