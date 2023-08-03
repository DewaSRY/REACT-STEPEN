import style from "./App.module.scss";
import { ButtonPage } from "./page/Button-Page";
import { AccordionPage } from "./page/Accordion-Page";
import { CounterPage } from "./page/Counter-Page";
import { DropDownPage } from "./page/Drop-Down-Page";
import { SideBar, Route } from "./component";
import { ModalPage } from "./page/Model-page";
import { TablePage } from "./page/Table-page";
import { MovieSongPage } from "./page/Movie-Song-page";
import { CarsFormPage } from "./page/Car-Form-page";
import { ApiAsyncPage } from "./page/Api-Async-page";
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
        <Route path="/carForm">
          <CarsFormPage />
        </Route>
        <Route path="/apiAsync">
          <ApiAsyncPage />
        </Route>
      </div>
    </div>
  );
}
export default App;
