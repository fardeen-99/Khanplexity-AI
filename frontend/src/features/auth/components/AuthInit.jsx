import { useEffect } from "react";
import { useAuth } from "../hooks/auth.hook";

const AuthInit = ({ children }) => {
    const { handlegetme } = useAuth();

    useEffect(() => {
        handlegetme();
    }, []);

    return children;
};

export default AuthInit;
