// src/components/LoginForm.js
import { useState } from 'react';
import Link from 'next/link';
import styles from './LoginForm.module.css';

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password });
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Iniciar sesión</h2>
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
            <button type="submit" className={styles.button}>
                Iniciar sesión
            </button>
            <div className={styles.footerText}>
                ¿No tienes una cuenta?{' '}
                <Link href="/signup" className={styles.footerLink}>
                    Regístrate aquí
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
