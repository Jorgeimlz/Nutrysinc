// src/pages/login.js
import { useRouter } from 'next/router';
import { auth, db } from '../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import LoginForm from '../components/LoginForm';
import styles from './LoginPage.module.css';

export default function Login() {
    const router = useRouter();

    const handleLogin = async ({ email, password }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                // Redirigimos según el rol
                if (userData.role === 'admin') {
                    router.push('/admin/dashboard');
                } else {
                    router.push('/user/dashboard');
                }
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <LoginForm onSubmit={handleLogin} />
        </div>
    );
}
