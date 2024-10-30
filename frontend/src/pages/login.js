// src/pages/login.js
import { useRouter } from 'next/router';
import { auth } from '../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import LoginForm from '../components/LoginForm';

export default function Login() {
    const router = useRouter();

    const handleLogin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('User logged in successfully');
            router.push('/dashboard'); // Cambia esta ruta si tienes otra página de usuario
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <LoginForm onSubmit={handleLogin} buttonText="Login" />
        </div>
    );
}
