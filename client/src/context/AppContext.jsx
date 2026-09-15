import { createContext, useContext } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [cars, setCars] = useState([])

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/data');

            if (data.success) {
                setUser(data.user);
                setIsOwner(data.user.role?.toLowerCase() === "owner");
            } else {
                logout();
            }

        } catch (error) {
            console.log("FETCH USER ERROR:", error.response?.data || error.message);

            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
            setIsOwner(false);

            axios.defaults.headers.common['Authorization'] = '';

            toast.error("Session expired. Please login again.");
        } finally {
            setLoading(false);
        }
    };

    const fetchCars = async () => {
        try {
            const { data } = await axios.get('/api/user/cars')
            if (data.success) {
                setCars(data.cars)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('token');

        setToken(null);
        setUser(null);
        setIsOwner(false);

        delete axios.defaults.headers.common['Authorization'];

        toast.success('You have been logged out');
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            setToken(storedToken);

            axios.defaults.headers.common['Authorization'] =
                `Bearer ${storedToken}`;
        } else {
            setLoading(false);
        }

        fetchCars();
    }, []);

    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, [token]);

    const value = {
        navigate,
        loading,
        user,
        setUser,
        token,
        setToken,
        isOwner,
        setIsOwner,
        fetchUser,
        showLogin,
        setShowLogin,
        fetchCars,
        cars,
        setCars,
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,
        logout
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}