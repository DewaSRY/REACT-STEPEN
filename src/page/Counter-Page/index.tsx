import style from "./CounterPage.module.scss";
import { useReducer } from "react";
import { Button } from "../../component/Button";
// const createAction = (type, payload) => ({ type, payload });
enum reducerType {
  addValueCount = "addValueCount",
  setInputCount = "setInputCount",
}
interface IState {
  count: number;
  inputValue: number;
}
interface countOnClick {
  type: reducerType.addValueCount;
  payload: number;
}
interface countInitialValue {
  type: reducerType.setInputCount;
  payload: number;
}
type ReducerAction = countOnClick | countInitialValue;

const reducer = (state: IState, action: ReducerAction) => {
  const { type, payload } = action;
  switch (type) {
    case reducerType.addValueCount:
      return {
        ...state,
        count: state.count + payload,
      };
    case reducerType.setInputCount:
      return {
        ...state,
        inputValue: payload,
      };
    default:
      return state;
  }
};
export function CounterPage() {
  const [{ count, inputValue }, dispatch] = useReducer(reducer, {
    count: 0,
    inputValue: 0,
  });
  const setCount = (payload: number) =>
    dispatch({
      type: reducerType.addValueCount,
      payload: payload,
    });
  const setInputCount = (payload: number) =>
    dispatch({
      type: reducerType.setInputCount,
      payload: payload,
    });
  const handleAddWithInput = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCount(Number(inputValue));
    setInputCount(0);
  };
  return (
    <div className={style["counter-container"]}>
      <h1 className="text-lg">Count is {count}</h1>
      <div className={style["button-container"]}>
        <Button onClick={() => setCount(1)} outline rounded>
          Increment
        </Button>
        <Button onClick={() => setCount(-1)} outline rounded>
          Decrement
        </Button>
      </div>
      <form onSubmit={handleAddWithInput}>
        <label htmlFor="">Add a lot</label>
        <input
          onChange={(e) => setInputCount(Number(e.target.value))}
          className="p-3 shadow bg-gray-300 border-gray-300 w-full"
          type="text"
          value={inputValue || ""}
        />
        <Button outline>Add It</Button>
      </form>
    </div>
  );
}
