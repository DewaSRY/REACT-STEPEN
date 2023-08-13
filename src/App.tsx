// import style from "./App.module.scss";
import { ButtonPage } from "./page/Button-Page";
import { AccordionPage } from "./page/Accordion-Page";
import { CounterPage } from "./page/Counter-Page";
import { DropDownPage } from "./page/Drop-Down-Page";
import { ModalPage } from "./page/Model-page";
import { TablePage } from "./page/Table-page";
import { MovieSongPage } from "./page/Movie-Song-page";
import { CarsFormPage } from "./page/Car-Form-page";
import { ApiAsyncPage } from "./page/Api-Async-page";
import { NavigationApps } from "./page/NavigationApps";
const links = [
  {
    label: "Accordion",
    path: "/",
    element: <AccordionPage />,
  },
  {
    label: "Dropdown",
    path: "/Dropdown",
    element: <DropDownPage />,
  },

  {
    label: "Buttons",
    path: "/Buttons",
    element: <ButtonPage />,
  },
  {
    label: "Modal",
    path: "/modal",
    element: <ModalPage />,
  },
  {
    label: "table",
    path: "/table",
    element: <TablePage />,
  },
  {
    label: "count",
    path: "/count",
    element: <CounterPage />,
  },
  {
    label: "movieSong",
    path: "/movieSong",
    element: <MovieSongPage />,
  },
  {
    label: "carForm",
    path: "/carForm",
    element: <CarsFormPage />,
  },
  {
    label: "apiAsync",
    path: "/apiAsync",
    element: <ApiAsyncPage />,
  },
];
function App() {
  return <NavigationApps links={links} />;
}
export default App;
