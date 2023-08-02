import style from "./App.module.scss";
import { ButtonPage } from "./page/Button-Page";
import { AccordionPage } from "./page/Accordion-Page";
import { CounterPage } from "./page/Counter-Page";
import { DropDownPage } from "./page/Drop-Down-Page";
import { SideBar, Route } from "./component";
import { ModalPage } from "./page/Model-page";
import { TablePage } from "./page/Table-page";
import { MovieSongPage } from "./page/Movie-Song-page";
function App() {
  return (
    <div className={style.container}>
      <SideBar />
      <div className={style["items-container"]}>
        <Route path="/Accordion">
          <AccordionPage />
        </Route>
        <Route path="/">
          <DropDownPage />
        </Route>
        <Route path="/Buttons">
          <ButtonPage />
        </Route>
        <Route path="/modal">
          <ModalPage />
        </Route>
        <Route path="/count">
          <CounterPage />
        </Route>
        <Route path="/table">
          <TablePage />
        </Route>
        <Route path="/movieSong">
          <MovieSongPage />
        </Route>
      </div>
    </div>
  );
}
export default App;
