import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, 
    loginRequest, 
    verifyTokenRequest, 
    logoutRequest 
} from "../api/auth";
import Cookies from 'js-cookie'
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe estar definido en un contexto");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const ROLE_ADMIN = import.meta.env.VITE_ROLE_ADMIN;

    const signUp = async (user) => {
        try {
            const res = await registerRequest(user);
            //console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            setIsAdmin(false); //al registrarse es un usuario regular
        } catch (error) {
            //console.error(error);
            //Si guiamos un error al registrar el usuario
            //Guardamos el error en la variable error
            setErrors(error.response.data.message);
        }
    };//Fin de signup

    const signIn = async (user) => {
        try {
            const res = await loginRequest(user);
            //console.log(res);
            if (res.data.role === ROLE_ADMIN)
                setIsAdmin(true);

            setUser(res.data);
            setIsAuthenticated(true);
            setLoading(false)
        } catch (error) {
            //console.log(error.response.data.message);
            setErrors(error.response.data.message);
        }
    };//Fin de signIn

    //Use effect que vacía el arreglo de errores pasados 5 segundos 
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer);
        }//Fin de if
    }, [errors]); //Fin de useEffect

    //useEffect para verificar la sesión del usuario
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            console.log(cookies);

            if (!cookies.token) {
                //Si no hay una cookie que contenga el token
                setIsAuthenticated(false); //El usuario no esta autenticado
                setLoading(false);//No hay cookie y ya no se cargan los datos
                //Establecemos los datos del usuario a nulo
                return setUser(null);
            }//Fin de if(!cookies.token)

            try {//En caso de que si exista un token, lo verificamos
                const res = await verifyTokenRequest(cookies.token);
                console.log(res);
                if (!res.data) { //Si el servidor no responde cotn un token
                    setIsAuthenticated(false);//El usuario no esta autenticado
                    setLoading(false);
                    setUser(null);
                    setIsAdmin(false);
                    return;
                }

                //En caso de que si exista un token, y se obtengan datos de respuesta
                setIsAuthenticated(true);//El usuario ya esta autenticado
                setUser(res.data);
                setLoading(false); //Terminó de cargart los datos del usuario
                if(res.data.role === ROLE_ADMIN)
                    setIsAdmin(true);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setLoading(false);
                setUser(null);
                setIsAdmin(false);
            }//Fin del catch

        }//Fin de checkLogin

        checkLogin();
    }, []); //Fin de useEffect para checkLogin

    //Funcion para cerrar sesión
    const logOut= ()=>{
    logoutRequest();
    Cookies.remove('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
    setLoading(true);
    };//Fin de logOut

    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            user,
            isAuthenticated,
            errors,
            loading,
            isAdmin,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    );
};//Fin de AuthProvider