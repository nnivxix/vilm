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
  setAccount: (account?: Account | null) => void;
}


const AccountProviderContext = createContext<AccountProviderState>({
  account: null,
  setAccount: () => null
})

export function AccountProvider({
  children,
  ...props
}: {
  children: React.ReactNode
}) {

  const { item: token } = $localStorage("token");
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    const getAccount = async () => {
      const response = await $fetch<Response>("/account", {
        headers: {
          Authorization: "Bearer " + token,
        },
        defaultToken: false,
      });

      const data = await response.json();

      setAccount(data);
    };

    getAccount();
  }, [token]);
  const value = {
    account,
    setAccount: () => {
      setAccount(null)
    }
  }
  return (
    <AccountProviderContext.Provider {...props} value={value}>
      {children}
    </AccountProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAccount = () => {
  const context = useContext(AccountProviderContext);

  return context;

}
