// src/pages/signup.js
import { useRouter } from 'next/router';
import { auth, db } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import RegisterForm from '../components/RegisterForm';

export default function SignUp() {
    const router = useRouter();

    const handleSignUp = async ({ email, password, fullName, username, height, weight, birthDate, goal, dietaryPreferences }) => {
        try {
            // Crear usuario en Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Guardar datos adicionales en Firestore usando el UID del usuario
            await setDoc(doc(db, 'users', user.uid), {
                fullName,
                username,
                email,
                height,
                weight,
                birthDate,
                goal,
                dietaryPreferences,
                createdAt: new Date(),
            });

            alert('User registered successfully');
            router.push('/login');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <RegisterForm onSubmit={handleSignUp} buttonText="Sign Up" />
        </div>
    );
}
