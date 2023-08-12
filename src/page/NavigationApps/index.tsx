import style from "./Navigation.module.scss";
import {
  FC,
  useState,
  useEffect,
  MouseEventHandler,
  ReactNode,
  AnchorHTMLAttributes,
} from "react";

interface ListsLink {
  label: string;
  path: string;
  element: ReactNode;
}
interface NavigationAppsProps {
  links: ListsLink[];
}

type LinkProps = {
  to: string;
  onNavigate: (to: string) => void;
  isCurrentPath: string;
  label: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;
const Link: FC<LinkProps> = ({ to, onNavigate, isCurrentPath, label }) => {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (event.metaKey || event.ctrlKey) return;
    event.preventDefault();
    onNavigate(to);
  };
  const classes = [
    style.links,
    style[isCurrentPath === to ? "links-active" : ""],
  ].join(" ");
  return (
    <a role="link" className={classes} href={to} onClick={handleClick}>
      {label.toLocaleUpperCase()}
    </a>
  );
};
export const NavigationApps: FC<NavigationAppsProps> = ({
  links,
}): JSX.Element => {
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
  const { element } = links.find((Link) => Link.path === currentPath);
  return (
    <div role="navigation-app" className={style["app-container"]}>
      <div className={style["app-navigation"]}>
        <div className={style["app-navigation-lists"]}>
          {links.map((link, idx) => {
            return (
              <Link
                label={link.label}
                key={idx}
                to={link.path}
                isCurrentPath={currentPath}
                onNavigate={navigate}
              />
            );
          })}
        </div>
      </div>
      <div className={style["app-element"]}>{element}</div>
    </div>
  );
};
