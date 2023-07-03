import { BottomNav } from "../components/BottomNav";
import { useAuth } from "../providers/auth";
import { Outlet, useLocation, useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";

export default function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  createEffect(() => {
    if (location.pathname && !auth?.isAuthenticated()) {
      navigate("/login");
      return;
    }
  });

  return (
    <>
      <div class="h-full pb-12 container mx-auto p-2">
        <Outlet />
      </div>
      <BottomNav />
    </>
  );
}
