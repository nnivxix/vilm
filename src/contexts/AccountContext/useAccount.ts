export const useAccount = () => {
  const context = useContext(AccountProviderContext);

  return context;
};
