import { createContext, useState, useEffect, PropsWithChildren } from "react";
type NavigationContext = {
  navigate: (to: string) => void;
  currentPath: string;
};
export const NavigationContext = createContext<NavigationContext>({
  navigate: () => {},
  currentPath: "",
});

export function NavigationProvider({ children }: PropsWithChildren) {
  const [currentPath, setCurrentPhat] = useState(window.location.pathname);
  useEffect(() => {
    const handler = () => {
      setCurrentPhat(window.location.pathname);
    };
    window.addEventListener("popstate", handler);
    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, []);
  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setCurrentPhat(to);
  };
  const values = {
    navigate,
    currentPath,
  };
  return (
    <NavigationContext.Provider value={values}>
      {children}
    </NavigationContext.Provider>
  );
}
