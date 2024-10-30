// src/pages/user/dashboard.js
import { useRouter } from 'next/router';
import { auth } from '../../services/firebaseConfig';
import withAuth from '../../utils/withAuth';

const UserDashboard = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await auth.signOut();
        router.push('/'); // Redirige a la página de inicio después de cerrar sesión
    };

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome to Your Dashboard!</h1>
            <p>Explore healthy recipes and track your nutrition goals.</p>
            <button onClick={handleLogout} style={styles.button}>
                Cerrar sesión
            </button>
        </div>
    );
};

const styles = {
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#ff5a5a',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
    },
};

export default withAuth(UserDashboard, 'user');
