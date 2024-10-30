// src/pages/signup.js
import { useRouter } from 'next/router';
import { auth, db } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import RegisterForm from '../components/RegisterForm';
import styles from './SignupPage.module.css';

export default function SignUp() {
    const router = useRouter();

    const handleSignUp = async (formData) => {
        const { email, password, ...additionalData } = formData;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Guardamos el rol "user" por defecto en Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email,
                role: 'user', // Rol asignado por defecto
                ...additionalData,
                createdAt: new Date(),
            });

            alert('Usuario registrado exitosamente');
            router.push('/login');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}></div>
            <div className={styles.form}>
                <RegisterForm onSubmit={handleSignUp} buttonText="Crear cuenta" />
            </div>
        </div>
    );
}
