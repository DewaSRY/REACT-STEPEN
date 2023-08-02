import { useMemo } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootStore, AppDispatch, carsAction } from "../store";
export function useCarsStore() {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
  const dispatch = useAppDispatch();
  const { addCar, changeSearchTerm, removeCar } = useMemo(
    () => bindActionCreators(carsAction, dispatch),
    [dispatch]
  );
  const { data, searchTerm } = useAppSelector((state) => state.cars);
  return {
    data,
    searchTerm,
    addCar,
    changeSearchTerm,
    removeCar,
  };
}
