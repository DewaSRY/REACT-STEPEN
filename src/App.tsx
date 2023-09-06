// import style from "./App.module.scss";
import NavigationApp from "./component/Navigation";
import ButtonPage from "./component/Button";
import TablePage from "./component/Table";
import ModalPage from "./component/Model";
import AccordionPage from "./component/Accordion";
import MovieSongPage from "./component/MovieSong";
import DropDownPage from "./component/DropDown";
import ApiAsyncPage from "./component/ApiAsync";
import CarsFormPage from "./component/CarForm";
import CounterPage from "./component/Counter";
function App() {
  return (
    <NavigationApp
      pages={[
        <ButtonPage />,
        <TablePage />,
        <ModalPage />,
        <AccordionPage />,
        <MovieSongPage />,
        <DropDownPage />,
        <ApiAsyncPage />,
        <CarsFormPage />,
        <CounterPage />,
      ]}
    />
  );
}
export default App;
