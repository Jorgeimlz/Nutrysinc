// src/utils/withAuth.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../services/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const withAuth = (WrappedComponent, requiredRole) => {
    return function WithAuth(props) {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [hasAccess, setHasAccess] = useState(false);

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        if (userData.role === requiredRole) {
                            setHasAccess(true);
                        } else {
                            router.push('/unauthorized');
                        }
                    }
                } else {
                    router.push('/login');
                }
                setLoading(false);
            });
            return () => unsubscribe();
        }, []);

        if (loading) return <p>Cargando...</p>;
        if (!hasAccess) return null;

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
