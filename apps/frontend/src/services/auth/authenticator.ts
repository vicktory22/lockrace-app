import Clerk from "@clerk/clerk-js";

export type SignInProps = {
  afterSignInUrl?: string;
};

export type AuthClient = {
  isAuthenticated: () => boolean;
  token: () => Promise<string | null | undefined>;
  user: Clerk["user"];
  client: Clerk["client"];
  openSignIn: (props: SignInProps) => void;
};

export async function AuthClient(): Promise<AuthClient> {
  return AuthManager(import.meta.env.MODE).getAuthClient(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
}

function AuthManager(env: string) {
  return {
    getAuthClient: async (publishableKey: string): Promise<AuthClient> => {
      if (env === "test") {
        return TestClient();
      }

      return await ClerkClient(publishableKey);
    },
  };
}

async function ClerkClient(publishableKey: string) {
  const authClient = new Clerk(publishableKey);
  await authClient.load();

  return {
    isAuthenticated: () => authClient.session?.status === "active",
    token: async () => authClient.session?.getToken(),
    user: authClient.user,
    client: authClient.client,
    openSignIn: () => authClient.openSignIn(),
  };
}

function TestClient() {
  return {
    isAuthenticated: () => true,
    token: async () => "test-token",
    user: {} as AuthClient["user"],
    client: {} as AuthClient["client"],
    openSignIn: () => {},
  };
}
