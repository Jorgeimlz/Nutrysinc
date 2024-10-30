// src/pages/admin/dashboard.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import withAuth from '../../utils/withAuth';

const AdminDashboard = () => {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ email: '', fullName: '', role: 'user' });
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersList);
        };
        fetchUsers();
    }, []);

    const handleAddUser = async () => {
        if (!newUser.email || !newUser.fullName) return;
        const usersCollection = collection(db, 'users');
        await addDoc(usersCollection, newUser);
        setUsers([...users, newUser]);
        setNewUser({ email: '', fullName: '', role: 'user' });
    };

    const handleUpdateUser = async () => {
        if (editUser) {
            const userDoc = doc(db, 'users', editUser.id);
            await updateDoc(userDoc, { email: editUser.email, fullName: editUser.fullName, role: editUser.role });
            setUsers(users.map(user => (user.id === editUser.id ? editUser : user)));
            setEditUser(null);
        }
    };

    const handleDeleteUser = async (userId) => {
        const userDoc = doc(db, 'users', userId);
        await deleteDoc(userDoc);
        setUsers(users.filter(user => user.id !== userId));
    };

    const handleLogout = async () => {
        await auth.signOut();
        router.push('/');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Panel de Administración - Gestión de Usuarios</h1>
            <button onClick={handleLogout} style={styles.logoutButton}>Cerrar sesión</button>

            <h2 style={styles.subtitle}>Usuarios Registrados</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Email</th>
                        <th style={styles.tableHeader}>Nombre Completo</th>
                        <th style={styles.tableHeader}>Rol</th>
                        <th style={styles.tableHeader}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} style={styles.tableRow}>
                            <td style={styles.tableCell}>{user.email}</td>
                            <td style={styles.tableCell}>{user.fullName}</td>
                            <td style={styles.tableCell}>{user.role}</td>
                            <td style={styles.tableCell}>
                                <button onClick={() => setEditUser(user)} style={styles.actionButton}>Editar</button>
                                <button onClick={() => handleDeleteUser(user.id)} style={styles.deleteButton}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 style={styles.subtitle}>{editUser ? 'Editar Usuario' : 'Agregar Usuario Nuevo'}</h2>
            <div style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={editUser ? editUser.email : newUser.email}
                    onChange={(e) =>
                        editUser
                            ? setEditUser({ ...editUser, email: e.target.value })
                            : setNewUser({ ...newUser, email: e.target.value })
                    }
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Nombre Completo"
                    value={editUser ? editUser.fullName : newUser.fullName}
                    onChange={(e) =>
                        editUser
                            ? setEditUser({ ...editUser, fullName: e.target.value })
                            : setNewUser({ ...newUser, fullName: e.target.value })
                    }
                    style={styles.input}
                />
                <select
                    value={editUser ? editUser.role : newUser.role}
                    onChange={(e) =>
                        editUser
                            ? setEditUser({ ...editUser, role: e.target.value })
                            : setNewUser({ ...newUser, role: e.target.value })
                    }
                    style={styles.input}
                >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>
                <button
                    onClick={editUser ? handleUpdateUser : handleAddUser}
                    style={styles.addButton}
                >
                    {editUser ? 'Guardar Cambios' : 'Agregar Usuario'}
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '50px',
        maxWidth: '800px',
        margin: 'auto',
    },
    title: {
        fontSize: '2rem',
        color: '#333',
    },
    subtitle: {
        fontSize: '1.5rem',
        color: '#555',
        margin: '20px 0',
    },
    logoutButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#ff5a5a',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
    },
    table: {
        width: '100%',
        marginTop: '20px',
        borderCollapse: 'collapse',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    tableHeader: {
        backgroundColor: '#0070f3',
        color: 'white',
        padding: '10px',
        fontSize: '1rem',
    },
    tableRow: {
        backgroundColor: '#f9f9f9',
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: '10px',
        fontSize: '0.95rem',
        color: '#333',
    },
    actionButton: {
        padding: '5px 10px',
        fontSize: '14px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        marginRight: '5px',
    },
    deleteButton: {
        padding: '5px 10px',
        fontSize: '14px',
        backgroundColor: '#ff5a5a',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
    },
    input: {
        padding: '10px',
        margin: '5px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        width: '100%',
    },
    addButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    },
};

export default withAuth(AdminDashboard, 'admin');
