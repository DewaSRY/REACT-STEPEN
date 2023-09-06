import { bindActionCreators } from "redux";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootStore, AppDispatch, formAction } from "../store";
export function useFormStore() {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
  const dispatch = useAppDispatch();

  const { changeCost, changeName } = bindActionCreators(formAction, dispatch);
  const { cost, name } = useAppSelector((state) => state.form);

  return {
    cost,
    name,
    changeCost,
    changeName,
  };
}
