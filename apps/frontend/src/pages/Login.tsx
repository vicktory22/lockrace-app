import { useAuth } from "../providers/auth";
import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";

export default function Login() {
  const navigate = useNavigate();

  createEffect(async () => {
    const auth = useAuth();

    if (auth?.isAuthenticated()) {
      navigate("/");
    }

    auth?.openSignIn({
      afterSignInUrl: "/",
    });
  });

  return <div />;
}
