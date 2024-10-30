// src/pages/index.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../services/firebaseConfig';

export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Escucha el estado de autenticación de Firebase
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                // Si el usuario está autenticado, redirige a la página de inicio
                setUser(currentUser);
                router.push('/dashboard'); // Cambia '/dashboard' por la ruta de tu página de usuario
            } else {
                setUser(null); // Usuario no autenticado
            }
        });
        return unsubscribe;
    }, [router]);

    return (
        <div style={styles.container}>
            <h1>Welcome to NutriSync!</h1>
            <p>Your platform for healthy recipes and nutrition goals.</p>
            {!user && (
                <div style={styles.buttonContainer}>
                    <button style={styles.button} onClick={() => router.push('/login')}>
                        Login
                    </button>
                    <button style={styles.button} onClick={() => router.push('/signup')}>
                        Sign Up
                    </button>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
    },
    buttonContainer: {
        marginTop: '20px',
        display: 'flex',
        gap: '10px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};
