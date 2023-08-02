import { useFormStore, useCarsStore } from "../../hooks";

function CarValue() {
  const { data, searchTerm } = useCarsStore();
  const totalCost = data
    .filter((car) => car.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .reduce((acc, car) => acc + car.cost, 0);

  return <div className="car-value">Total Cost: ${totalCost}</div>;
}
function CarSearch() {
  const { changeSearchTerm, searchTerm } = useCarsStore();

  return (
    <div className="list-header">
      <h3 className="title is-3">My Cars</h3>
      <div className="search field is-horizontal">
        <label className="label">Search</label>
        <input
          className="input"
          value={searchTerm}
          onChange={(e) => changeSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}

function CarList() {
  const { data, searchTerm, removeCar } = useCarsStore();
  const { name } = useFormStore();

  const filteredCars = data.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const renderedCars = filteredCars.map((car) => {
    const bold = name && car.name.toLowerCase().includes(name.toLowerCase());
    return (
      <div key={car.id} className={`panel ${bold && "bold"}`}>
        <p>
          {car.name} - ${car.cost}
        </p>
        <button className="button is-danger" onClick={() => removeCar(car.id)}>
          Delete
        </button>
      </div>
    );
  });

  return (
    <div className="car-list">
      {renderedCars}
      <hr />
    </div>
  );
}

function CarForm() {
  const { name, cost, changeName, changeCost } = useFormStore();
  const { addCar } = useCarsStore();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addCar({ name, cost });
  };

  return (
    <div className="car-form panel">
      <h4 className="subtitle is-3">Add Car</h4>
      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <div className="field">
            <label className="label">Name</label>
            <input
              className="input is-expanded"
              value={name}
              onChange={(e) => changeName(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="label">Cost</label>
            <input
              className="input is-expanded"
              value={cost || ""}
              onChange={(e) => changeCost(parseInt(e.target.value || "0"))}
              type="number"
            />
          </div>
        </div>
        <div className="field">
          <button className="button is-link">Submit</button>
        </div>
      </form>
    </div>
  );
}
export function CarsFormPage() {
  return (
    <div>
      <CarForm />
      <CarSearch />
      <CarList />
      <CarValue />
    </div>
  );
}
