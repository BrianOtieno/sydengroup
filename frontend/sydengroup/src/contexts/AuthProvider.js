import { createContext } from "react";


const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    // const [auth, setAuth] = useState({});
    // const [firstName, setFirstName] = useState({});
    // const [lastName, setLastName] = useState({});
    // const [email, setEmail] = useState('');
    // const [showProfile, setShowProfile] = useState(false);

    return (
        <AuthContext>
            {children}
        </AuthContext>
    )
}

export default AuthContext;