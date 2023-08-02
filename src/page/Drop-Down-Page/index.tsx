import style from "./DropDownPage.module.scss";
import { Panel } from "../../component";
import { useState, useRef, useEffect } from "react";
import { GoChevronDown } from "react-icons/go";

type Option = {
  label: string;
  value: string;
};
type DropDown = {
  options: Option[];
  onClickOption: (arg: Option) => void;
  value?: Option;
};
function DropDown({ options, onClickOption, value }: DropDown) {
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
    <div ref={divElement} className={style["select-bar"]}>
      <Panel
        className={style["select-panel"]}
        onClick={() => setOpen(!isOpen)}
        placeholder="Search"
      >
        {value?.label || "Select"}
        <GoChevronDown />
      </Panel>
      {isOpen && (
        <Panel className={style["option-bar"]}>
          {options.map((option) => (
            <div
              className={style["option-panel"]}
              key={option.value}
              onClick={() => onClickOption(option)}
            >
              {option.label}
            </div>
          ))}
        </Panel>
      )}
    </div>
  );
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
export function DropDownPage() {
  const [select, setSelect] = useState<Option | undefined>();

  return (
    <div className={style.container}>
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
