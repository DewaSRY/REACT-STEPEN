import style from "./Navigation.module.scss";
import { useNavigation } from "../../hooks";

const links = [
  {
    label: "Dropdown",
    path: "/",
  },
  {
    label: "Accordion",
    path: "/Accordion",
  },
  {
    label: "Buttons",
    path: "/Buttons",
  },
  {
    label: "Modal",
    path: "/modal",
  },
  {
    label: "table",
    path: "/table",
  },
  {
    label: "count",
    path: "/count",
  },
  {
    label: "movieSong",
    path: "/movieSong",
  },
  {
    label: "car",
    path: "/car",
  },
  {
    label: "api",
    path: "/api",
  },
];
type LinkProps = {
  to: string;
  children: React.ReactNode;
};
type RouteProps = {
  path: string;
  children: React.ReactNode;
};

// activeClassName="font-bold border-l-4 border-blue-500 pl-2"

export function SideBar() {
  return (
    <div className={style.container}>
      {links.map((link, idx) => {
        return (
          <Link key={idx} to={link.path}>
            {link.label.toLocaleUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
export function Route({ path, children }: RouteProps) {
  const { currentPath } = useNavigation();
  if (path === currentPath) return children;
  return;
}
function Link({ to, children }: LinkProps) {
  const { navigate, currentPath } = useNavigation();
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey) return;
    event.preventDefault();
    navigate(to);
  };
  const classes = [
    style.links,
    style[currentPath === to ? "link-active" : ""],
  ].join(" ");
  return (
    <a className={classes} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}
