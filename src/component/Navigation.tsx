import style from "./Navigation.module.scss";
import {
  FC,
  ReactElement,
  useEffect,
  useState,
  MouseEventHandler,
} from "react";

interface RouteProps {
  handlerNavigate: (phat: string) => void;
  Phat: string;
}
export const Route: FC<RouteProps> = ({
  handlerNavigate,
  Phat,
}): JSX.Element => {
  const handlerClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    handlerNavigate(Phat);
  };
  return <a onClick={handlerClick}>{Phat}</a>;
};
interface NavigationAppProps {
  pages: ReactElement[];
}
const NavigationApp: FC<NavigationAppProps> = ({ pages }): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(pages[0].type["name"]);
  useEffect(() => {
    window.history.pushState({}, "", pages[0].type["name"]);
  }, [pages]);
  useEffect(() => {
    const routingHandler = () => {
      setCurrentPage(window.location.pathname);
    };
    window.addEventListener("popstate", routingHandler);
    return () => {
      window.removeEventListener("popstate", routingHandler);
    };
  }, []);

  const navigateTo = (phat: string) => {
    window.history.pushState({}, "", phat);
    setCurrentPage(phat);
  };
  const element = pages.find((page) => page.type["name"] === currentPage);
  return (
    <main className={style.Main}>
      <nav
        className={style.navigation}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {pages.map((page, id) => (
          <Route
            key={id}
            handlerNavigate={navigateTo}
            Phat={page.type["name"]}
          />
        ))}
      </nav>
      <section className={style.content}>
        {element ? element : "something wrongs"}
      </section>
    </main>
  );
};

export default NavigationApp;
