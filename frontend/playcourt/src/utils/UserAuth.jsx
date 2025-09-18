import api from '../api/apis';
import { useState, useEffect } from 'react';

const UserAuth = () => {
    const [user, setUser] = useState(null);

    const fetchCurrentUser = async () => {
        try {
            const token = sessionStorage.getItem("access_token");

            const clientData = await api.get("me/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(clientData.data);

        } catch (err) {
            // console.error("Error obteniendo usuario:", err.response?.data || err);
            if (err.response?.data || err) {
                sessionStorage.removeItem("access_token");
            };
        };
    };

    useEffect(() => {
        fetchCurrentUser();
    }, [user]);

    return user;
};

export default UserAuth;