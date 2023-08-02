import { useState, Fragment } from "react";
// import { useSort } from "../../hooks";
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
type TableProps = {
  data: Data[];
  config: Config[];
};
function Table({ data, config }: TableProps) {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return <th key={column.label}>{column.label}</th>;
  });
  const renderedRows = data.map((rowData, key) => {
    const renderedCells = config.map((column) => {
      return (
        <td className="p-2" key={column.label}>
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
    <table className="table-auto border-spacing-2">
      <thead>
        <tr className="border-b-2">{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}
function SortableTable(props: TableProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const { config, data } = props;
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
    if (!column.sortValue) {
      return column;
    }
    return {
      ...column,
      header: () => (
        <th
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => handleClick(column.label)}
        >
          <div className="flex items-center">
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </div>
        </th>
      ),
    };
  });
  let sortedData = data;
  let sortValue: (arg: Data) => string | number;
  if (sortOrder && sortBy) {
    const findSort = config.find((column) => column.label === sortBy);
    if (findSort?.sortValue) {
      sortValue = findSort.sortValue;
    }
    sortedData = [...data].sort((a, b) => {
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
  return <Table data={sortedData} config={updatedConfig} />;
}
function getIcons(
  label: string,
  sortBy: string | null,
  sortOrder: string | null
) {
  if (label !== sortBy || sortOrder === null) {
    return (
      <div>
        <GoArrowUp />
        <GoArrowDown />
      </div>
    );
  } else if (sortOrder === "asc") {
    return (
      <div>
        <GoArrowUp />
      </div>
    );
  } else if (sortOrder === "desc") {
    return (
      <div>
        <GoArrowDown />
      </div>
    );
  }
}

export function TablePage() {
  const data = [
    { name: "Orange", color: "orange", score: 5 },
    { name: "Apple", color: "bg-red-500", score: 3 },
    { name: "Banana", color: "bg-yellow-500", score: 1 },
    { name: "Lime", color: "bg-green-500", score: 4 },
    { name: "Cherry", color: "bg-red-700", score: 2.5 },
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
      label: "Score Squared",
      render: (fruit) => fruit.score ** 2,
      sortValue: (fruit) => fruit.score ** 2,
    },
  ];

  // const keyFn = (fruit: Data) => {
  //   return fruit.name;
  // };

  return (
    <div>
      <SortableTable data={data} config={config} />
    </div>
  );
}
