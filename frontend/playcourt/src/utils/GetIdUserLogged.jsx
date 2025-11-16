import api from '../api/apis';
import { useState, useEffect } from 'react';

const GetIdUserLogged = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
        try {
            const token = sessionStorage.getItem("access_token");
            if (!token) return;

            const response = await api.get("me/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data.id);

        } catch (err) {
            console.error("Error obteniendo usuario:", err.response?.data || err);
            sessionStorage.removeItem("access_token");
        }
        };

        fetchUser();
    }, []);

    return user;
};

export default GetIdUserLogged;