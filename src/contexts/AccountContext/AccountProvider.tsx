import { createContext } from "react"

export interface Account {
  avatar: Avatar
  id: number
  iso_639_1: string
  iso_3166_1: string
  name: string
  include_adult: boolean
  username: string
}

export interface Avatar {
  gravatar: Gravatar
  tmdb: Tmdb
}

export interface Gravatar {
  hash: string
}

export interface Tmdb {
  avatar_path?: string
}

type AccountProviderState = {
  account?: Account | null;
  isAuthenticated: boolean;
  setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AccountProviderContext = createContext<AccountProviderState>({
  account: null,
  isAuthenticated: false,
  setAccount: () => null,
  setIsAuthenticated: () => false
})

export function AccountProvider({
  children
}: {
  children: React.ReactNode
}) {

  const { item: token } = $localStorage("token");
  const [account, setAccount] = useState<Account | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!account?.username);

  useEffect(() => {
    const getAccount = async () => {
      if (!token.length) return;

      const { data, error } = await $fetch<Account>("/account", {
        headers: {
          Authorization: "Bearer " + token,
        },
        defaultToken: false,
      });

      setAccount(data);
      if (error?.success === false) {
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(true)
      }

    };
    getAccount();
  }, [token]);

  const value = {
    account,
    isAuthenticated,
    setAccount,
    setIsAuthenticated,
  };

  return (
    <AccountProviderContext.Provider value={value}>
      {children}
    </AccountProviderContext.Provider>
  );
}

