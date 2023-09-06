import { bindActionCreators } from "redux";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootStore, AppDispatch, carsAction } from "../store";
export function useCarsStore() {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
  const dispatch = useAppDispatch();

  const { addCar, changeSearchTerm, removeCar } = bindActionCreators(
    carsAction,
    dispatch
  );

  const data = useAppSelector((state) => state.cars.data);
  const searchTerm = useAppSelector((state) => state.cars.searchTerm);
  return {
    data,
    searchTerm,
    addCar,
    changeSearchTerm,
    removeCar,
  };
}
