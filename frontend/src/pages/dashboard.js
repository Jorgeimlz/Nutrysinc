// src/pages/dashboard.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../services/firebaseConfig';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push('/'); // Si no está autenticado, redirige a la página de inicio
            }
        });
        return unsubscribe;
    }, [router]);

    const handleLogout = async () => {
        await auth.signOut();
        router.push('/');
    };

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome, {user ? user.email : 'User'}!</h1>
            <p>Explore healthy recipes and track your nutrition goals.</p>
            <button onClick={handleLogout} style={styles.button}>
                Logout
            </button>
        </div>
    );
}

const styles = {
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#ff5a5a',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};
