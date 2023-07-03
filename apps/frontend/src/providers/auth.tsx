import { AuthClient } from "../services/auth/authenticator";
import { JSX, createContext, useContext } from "solid-js";

type AuthContext = {
  client: AuthClient;
};

type AuthContextProps = {
  client?: AuthClient;
  children?: JSX.Element;
};

const AuthContext = createContext<AuthClient>();

export default function AuthProvider(props: AuthContextProps) {
  return <AuthContext.Provider value={props.client}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
