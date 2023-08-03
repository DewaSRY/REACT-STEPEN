// import { useState, useCallback } from "react";

import { bindActionCreators } from "redux";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootStore, AppDispatch, UserThunkAction } from "../store";
export function useUserStore() {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
  const dispatch = useAppDispatch();
  const { addUser, fetchUser, removeUser } = bindActionCreators(
    UserThunkAction,
    dispatch
  );
  const { data, error, isLoading } = useAppSelector((state) => state.users);
  return {
    addUser,
    fetchUser,
    removeUser,
    data,
    error,
    isLoading,
  };
}

// export function useThunk() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setIsError] = useState(null);
//   const dispatch = useDispatch();
//   const runThunk = useCallback(
//     (arg) => {
//       setIsLoading(true);
//       dispatch(thunk(arg))
//         .unwrap()
//         .catch((error) => setIsError(error))
//         .finally(() => setIsLoading(false));
//     },
//     [dispatch, thunk]
//   );
//   return [runThunk, isLoading, error];
// }
