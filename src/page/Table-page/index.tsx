import style from "./TablePage.module.scss";
import { useState, FC } from "react";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
type Data = {
  name: string;
  color: string;
  score: number;
};
type Config = {
  label: string;
  render: (arg: Data) => string | React.ReactNode;
  sortValue?: (arg: Data) => number | string;
  header?: () => React.ReactNode;
};
interface TableProps {
  data: Data[];
  config: Config[];
}
const Table: FC<TableProps> = ({ data, config }) => {
  const renderedHeaders = config.map((column, id) => {
    const headData = column.header ? column.header() : column.label;
    return (
      <th className={style["table-head"]} key={id}>
        {headData}
      </th>
    );
  });

  const renderedRows = data.map((rowData, key) => {
    const renderedCells = config.map((column) => {
      return (
        <td className={style["table-data"]} key={column.label}>
          {column.render(rowData)}
        </td>
      );
    });
    return (
      <tr className="border-b" key={key}>
        {renderedCells}
      </tr>
    );
  });
  return (
    <table className={style["table"]}>
      <thead>
        <tr className="border-b-2">{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
};
type ShortOrderType = "asc" | "desc" | null;
interface useShortDataTableProps {
  (data: Data[], config: Config[]): {
    updateData: Data[];
    updatedConfig: Config[];
  };
}
const useShortDataTable: useShortDataTableProps = (data, config) => {
  const [sortOrder, setSortOrder] = useState<ShortOrderType>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const handleClick = (label: string) => {
    if (sortBy && label !== sortBy) {
      setSortOrder("asc");
      setSortBy(label);
      return;
    }
    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else if (sortOrder === "desc") {
      setSortOrder(null);
      setSortBy(null);
    }
  };
  const updatedConfig = config.map((column) => {
    if (!column.sortValue) return column;
    return {
      ...column,
      header: () => (
        <div
          className={style["sort-header"]}
          onClick={() => handleClick(column.label)}
        >
          {getIcons(column.label, sortBy, sortOrder)}
          {column.label}
        </div>
      ),
    };
  });
  let updateData = data;
  let sortValue: (arg: Data) => string | number;
  if (sortOrder && sortBy) {
    const findSort = config.find((column) => column.label === sortBy);
    if (findSort?.sortValue) {
      sortValue = findSort.sortValue;
    }
    updateData = [...data].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);
      const reverseOrder = sortOrder === "asc" ? 1 : -1;
      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB as string) * reverseOrder;
      } else {
        return (valueA - Number(valueB)) * reverseOrder;
      }
    });
  }
  return {
    updateData,
    updatedConfig,
  };
};
interface getIconsProps {
  (
    label: string,
    sortBy: string | null,
    sortOrder: ShortOrderType
  ): JSX.Element;
}
const getIcons: getIconsProps = (label, sortBy, sortOrder) => {
  if (label !== sortBy || sortOrder === null) {
    return (
      <div className={style["icons-container"]}>
        <GoArrowUp />
        <GoArrowDown />
      </div>
    );
  } else if (sortOrder === "asc") {
    return (
      <div className={style["icons-container"]}>
        <GoArrowUp />
      </div>
    );
  } else if (sortOrder === "desc") {
    return (
      <div className={style["icons-container"]}>
        <GoArrowDown />
      </div>
    );
  }
};
const data = [
  { name: "Orange", color: "orange", score: 5 },
  { name: "Apple", color: "red", score: 3 },
  { name: "Banana", color: "yellow", score: 1 },
  { name: "Lime", color: "green", score: 4 },
  { name: "Berry", color: "blue", score: 2.5 },
];

const config: Config[] = [
  {
    label: "Name",
    render: (fruit) => fruit.name,
    sortValue: (fruit) => fruit.name,
  },
  {
    label: "Color",
    render: (fruit) => (
      <div
        style={{ backgroundColor: `${fruit.color}`, padding: "13px" }}
        className={`p-3 m-2 `}
      />
    ),
  },
  {
    label: "Score",
    render: (fruit) => fruit.score,
    sortValue: (fruit) => fruit.score,
  },
  {
    label: " Squared",
    render: (fruit) => fruit.score ** 2,
    sortValue: (fruit) => fruit.score ** 2,
  },
];
export function TablePage() {
  const { updateData, updatedConfig } = useShortDataTable(data, config);

  return (
    <div className={style["table-container"]}>
      <div className={style["table-page"]}>
        <h2>Sorted Table</h2>
        <Table data={updateData} config={updatedConfig} />
      </div>
      <div className={style["table-page"]}>
        <h2>Table</h2>
        <Table data={data} config={config} />
      </div>
    </div>
  );
}
