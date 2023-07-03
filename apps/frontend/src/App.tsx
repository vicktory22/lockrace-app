import { AuthClient } from "./services/auth/authenticator";
import { Route, Router, Routes } from "@solidjs/router";
import { Show, createResource, lazy } from "solid-js";
const AuthProvider = lazy(() => import("./providers/auth"));
const AuthLayout = lazy(() => import("./pages/AuthLayout"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Picks = lazy(() => import("./pages/Picks"));
const Games = lazy(() => import("./pages/Games"));
const Me = lazy(() => import("./pages/Me"));

const App = () => {
  const [authClient] = createResource(() => AuthClient());

  return (
    <Show when={authClient()} fallback={<p>Loading...</p>}>
      <AuthProvider client={authClient()}>
        <Router>
          <Routes>
            <Route path="/login" component={Login} />
            <Route path="/" component={AuthLayout}>
              <Route path="/" component={Dashboard} />
              <Route path="/picks" component={Picks} />
              <Route path="/games" component={Games} />
              <Route path="/me" component={Me} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </Show>
  );
};

export default App;
