import style from "./Accordion.module.scss";
import { useState, FC } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
import { faker } from "@faker-js/faker";

const Items = new Array(4).fill(null).map(() => {
  return {
    id: faker.number.int(),
    label: faker.animal.bird(),
    content: faker.lorem.paragraph(),
  };
});
interface AccordionPanelProps {
  item: {
    id: number;
    label: string;
    content: string;
  };
  expanded: boolean;
  onExpended: () => void;
}
interface AccordionProps {
  items: {
    id: number;
    label: string;
    content: string;
  }[];
}
const Accordion: FC<AccordionProps> = ({ items }) => {
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
    <div className={style["accordion-container"]}>
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
    </div>
  );
};
const AccordionPanel: FC<AccordionPanelProps> = ({
  item,
  expanded,
  onExpended,
}) => {
  return (
    <div key={item.id} className={style["panel"]}>
      <div onClick={onExpended} className={style["panel-label"]}>
        {item.label}
        {expanded ? <GoChevronDown /> : <GoChevronLeft />}
      </div>
      {expanded ? (
        <div className={style["panel-content"]}>{item.content}</div>
      ) : null}
    </div>
  );
};
export default function AccordionPage() {
  return (
    <div className={style["accordion-page"]}>
      <Accordion items={Items} />
    </div>
  );
}
