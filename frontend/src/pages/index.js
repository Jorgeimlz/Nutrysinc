// src/pages/index.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                // Obtener el rol del usuario desde Firestore
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData.role === 'admin') {
                        router.push('/admin/dashboard'); // Redirige al panel de admin
                    } else {
                        router.push('/user/dashboard'); // Redirige al panel de usuario
                    }
                }
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
