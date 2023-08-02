import style from "./AccorDion.module.scss";
import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
const items = [
  {
    id: "3",
    label: "Click here",
    content: `
      Here is more infoHere is more infoHere is more infoHere is more info
      Here is more infoHere is more infoHere is more infoHere is more info
      Here is more infoHere is more infoHere is more infoHere is more info
      Here is more infoHere is more infoHere is more infoHere is more info
      Here is more infoHere is more infoHere is more infoHere is more info
      `,
  },
  {
    id: "1",
    label: "Another Section",
    content: `
      More content to show Here is more infoHere is more infoHere is more info
      More content to show Here is more infoHere is more infoHere is more info
      More content to show Here is more infoHere is more infoHere is more info
      More content to show Here is more infoHere is more infoHere is more info
      More content to show Here is more infoHere is more infoHere is more info
      `,
  },
  {
    id: "2",
    label: "Can i use react on my project",
    content: `
      Yas you can do it on any project Here is more infoHere is more infoHere is more info
      Yas you can do it on any project Here is more infoHere is more infoHere is more info
      Yas you can do it on any project Here is more infoHere is more infoHere is more info
      Yas you can do it on any project Here is more infoHere is more infoHere is more info
      Yas you can do it on any project Here is more infoHere is more infoHere is more info
      `,
  },
];
type AccordionItem = {
  id: string;
  label: string;
  content: string;
};
interface AccordionPanelProps {
  item: AccordionItem;
  expanded: boolean;
  onExpended: () => void;
}
function Accordion({ items }: { items: AccordionItem[] }) {
  const [expandIndex, isExpandIndex] = useState<number>(-1);
  const setExpanded = (nextIndex: number) =>
    isExpandIndex((prevExpend) => {
      if (prevExpend === nextIndex) {
        return -1;
      } else {
        return nextIndex;
      }
    });
  return (
    <>
      {items.map((item, idx) => {
        return (
          <AccordionPanel
            key={idx}
            item={item}
            onExpended={() => setExpanded(idx)}
            expanded={idx === expandIndex}
          />
        );
      })}
    </>
  );
}
function AccordionPanel({ item, expanded, onExpended }: AccordionPanelProps) {
  return (
    <div key={item.id}>
      <div onClick={onExpended} className={style["accordion-items"]}>
        {item.label}
        {expanded ? <GoChevronDown /> : <GoChevronLeft />}
      </div>
      {expanded && (
        <div className={style["accordion-items-content"]}>{item.content}</div>
      )}
    </div>
  );
}
export function AccordionPage() {
  return (
    <div className={style["accordion-container"]}>
      <Accordion items={items} />
    </div>
  );
}
