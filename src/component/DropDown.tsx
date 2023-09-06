import style from "./DropDown.module.scss";
import { useState, useRef, useEffect, FC } from "react";
import { GoChevronDown } from "react-icons/go";

type Option = {
  label: string;
  value: string;
};
interface DropDown {
  options: Option[];
  onClickOption: (arg: Option) => void;
  value?: Option;
}
const options = [
  {
    label: "Red",
    value: "red",
  },
  {
    label: "Green",
    value: "Green",
  },
  {
    label: "Blue",
    value: "Blue",
  },
];
const DropDown: FC<DropDown> = ({ options, onClickOption, value }) => {
  const [isOpen, setOpen] = useState(false);
  const divElement = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handlerClick = (event: MouseEvent) => {
      if (!divElement.current?.contains(event.target as HTMLElement))
        setOpen(false);
    };
    document.addEventListener("click", handlerClick, true);
    return () => {
      document.removeEventListener("click", handlerClick);
    };
  });
  return (
    <div ref={divElement} className={style["drop-down"]}>
      <div
        className={style["drop-down-select"]}
        onClick={() => setOpen(!isOpen)}
        placeholder="Search"
      >
        {value?.label || "Select"}
        <GoChevronDown />
      </div>
      {isOpen && (
        <div className={style["drop-down-options"]}>
          {options.map((option) => (
            <div
              className={style["drop-down-option"]}
              key={option.value}
              onClick={() => onClickOption(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function DropDownPage() {
  const [select, setSelect] = useState<Option | undefined>();
  return (
    <div className={style["drop-down-container"]}>
      <DropDown
        options={options}
        onClickOption={(opt) => setSelect(opt)}
        value={select}
      />
      <DropDown
        options={options}
        onClickOption={(opt) => setSelect(opt)}
        value={select}
      />
    </div>
  );
}
