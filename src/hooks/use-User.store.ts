// import { useState, useCallback } from "react";
import { useMemo } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootStore, AppDispatch, UserThunkAction } from "../store";
export function useUserStore() {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
  const dispatch = useAppDispatch();
  const { addUser, fetchUser, removeUser } = useMemo(
    () => bindActionCreators(UserThunkAction, dispatch),
    [dispatch]
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
