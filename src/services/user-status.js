import { useState } from "react"
import { createContainer } from "unstated-next";

const _useUserAuthenticationContext = () => {
    const [email, setEmail] = useState(null);
    return {
        email,
        isAuthenticated: email !== null,
        LogIn: (email) => {
            setEmail(email)
        },
        LogOut: () => {
            setEmail(null)
        }
    }
}

const UserContext = createContainer(_useUserAuthenticationContext);

export const UserContextProvider = UserContext.Provider;
export const userAuthenticationStatusContainer = UserContext.useContainer;
