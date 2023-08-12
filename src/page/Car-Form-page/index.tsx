import style from "./CarFormPage.module.scss";
import { FC, InputHTMLAttributes, useEffect, FormEventHandler } from "react";
import { useFormStore, useCarsStore } from "../../hooks";
import { Button } from "../../component";
const CarValue: FC = () => {
  const { data, searchTerm } = useCarsStore();
  const totalCost = data
    .filter((car) => car.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .reduce((acc, car) => acc + car.cost, 0);

  return <div className="car-value">Total Cost: ${totalCost}</div>;
};
const CarSearch: FC = () => {
  const { changeSearchTerm, searchTerm } = useCarsStore();
  return (
    <div className={style["search"]}>
      <InputsField
        label="Search"
        value={searchTerm}
        updates={(val) => {
          changeSearchTerm(String(val));
        }}
      />
    </div>
  );
};
const CarList: FC = () => {
  const { data, searchTerm, removeCar } = useCarsStore();
  const { name } = useFormStore();
  const filteredCars = data.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("test", name);
  const renderedCars = filteredCars.map((car) => {
    return (
      <div key={car.id} className={style["lists-panel"]}>
        <p>
          {car.name} - ${car.cost}
        </p>
        <Button onClick={() => removeCar(car.id)} outline buttonType="warning">
          Delete
        </Button>
      </div>
    );
  });
  return <div className={style["car-lists"]}>{renderedCars}</div>;
};
const CarForm: FC = () => {
  const { name, cost, changeName, changeCost } = useFormStore();
  const { addCar } = useCarsStore();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!name || !cost) return;
    addCar({ name, cost });
  };
  useEffect(() => {
    console.log("rerender");
    console.log(name, cost);
  }, [name, cost]);

  return (
    <div className={style["car-form"]}>
      <h4>Add Car</h4>
      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <InputsField
            label="Name"
            value={name}
            type="text"
            updates={(val) => {
              changeName(val);
            }}
          />
          <InputsField
            label="Cost"
            value={cost}
            type="number"
            updates={(val) => {
              changeCost(Number(val || "0"));
            }}
          />
        </div>
        <Button outline rounded>
          Submit
        </Button>
      </form>
    </div>
  );
};
type InputsFieldProps = {
  label: string;
  value: string | number;
  updates: (arg: string | number) => void;
} & InputHTMLAttributes<HTMLInputElement>;
const InputsField: FC<InputsFieldProps> = ({
  label,
  value,
  updates,
  ...rest
}) => {
  return (
    <div className={style["input-field"]}>
      <label className="label" htmlFor={label}>
        {label}
      </label>
      <input
        id={label}
        value={value || ""}
        onChange={(e) => {
          updates(e.target.value);
        }}
        placeholder={`${label}...`}
        {...rest}
      />
    </div>
  );
};

export const CarsFormPage: FC = () => {
  return (
    <div className={style["car-page"]}>
      <CarForm />
      <div className={style["car-page-details"]}>
        <h3>My Cars</h3>
        <CarSearch />
        <CarList />
        <CarValue />
      </div>
    </div>
  );
};
