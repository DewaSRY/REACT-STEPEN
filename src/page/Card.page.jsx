// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   changeName,
//   changeCost,
//   addCar,
//   removeCar,
//   changeSearchTerm,
// } from "../store";
// function CarValue({ value }) {
//   const totalPrice = value.reduce((total, car) => total + car.cost, 0);
//   return <div>total car Value: ${totalPrice}</div>;
// }
// function CarSearch() {
//   const serchTerm = useSelector((state) => state.cars.serchTerm);
//   const dispatch = useDispatch();
//   const handleSearchInput = (event) => {
//     const { value } = event.target;
//     dispatch(changeSearchTerm(value));
//   };
//   return (
//     <div>
//       <h3>MyCars</h3>
//       <div>
//         <label htmlFor=""></label>
//         <input
//           className="p-3 shadow bg-white w-full"
//           onChange={handleSearchInput}
//           value={serchTerm}
//           type="text"
//         />
//       </div>
//     </div>
//   );
// }
// function CarList({ onSetCarsArray }) {
//   const data = useSelector((state) => {
//     const { data, searchTerm } = state.cars;
//     if (searchTerm)
//       return data.filter((car) =>
//         car.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     return data;
//   });
//   useEffect(() => {
//     if (!data) return;
//     onSetCarsArray(data);
//   }, [data, onSetCarsArray]);
//   const dispatch = useDispatch();
//   const handleCarDelete = (data) => {
//     dispatch(removeCar(data));
//   };
//   const rendercars = data.map((car) => {
//     const { id, name, cost } = car;
//     return (
//       <div key={id}>
//         <p>
//           {name}-${cost}
//         </p>
//         <button className="bg-red-300 p-3" onClick={() => handleCarDelete(car)}>
//           Delete
//         </button>
//         <hr />
//       </div>
//     );
//   });
//   return <div>{rendercars}</div>;
// }
// function CarForm() {
//   const dispatch = useDispatch();
//   const handleNameChange = (event) => {
//     const { value } = event.target;
//     dispatch(changeName(value));
//   };
//   const handleCostChange = (event) => {
//     const { value } = event.target;
//     dispatch(changeCost(parseInt(value) || 0));
//   };
//   const name = useSelector((state) => {
//     return state.form.name;
//   });
//   const cost = useSelector((state) => {
//     return state.form.cost;
//   });
//   const hadleSubmit = (event) => {
//     event.preventDefault();
//     if (!name || !cost) return;
//     dispatch(
//       addCar({
//         name,
//         cost,
//       })
//     );
//     // dispatch(changeName(""));
//     // dispatch(changeCost(""));
//   };
//   return (
//     <div className="cart-form pane">
//       <h4 className="p-3">Add Car</h4>
//       <form onSubmit={hadleSubmit} action="">
//         <div className="flex">
//           <div className="field">
//             <label htmlFor="" className="label">
//               Name
//             </label>
//             <input
//               onChange={handleNameChange}
//               type="text"
//               className="p-3 shadow bg-white w-full"
//               value={name}
//             />
//           </div>
//           <div className="field">
//             <label htmlFor="" className="label">
//               Cost
//             </label>
//             <input
//               onChange={handleCostChange}
//               type="number"
//               className="p-3 shadow bg-white w-full"
//               value={cost || ""}
//             />
//           </div>
//           <div>
//             <button className="bg-gray-300 p-3">submit</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }
// export function CarPage() {
//   const [carsArray, setCarsArray] = useState([]);
//   const handelSetCarArray = (data) => {
//     console.log(data);
//     setCarsArray(data);
//   };
//   return (
//     <div>
//       <CarForm />
//       <CarSearch />
//       <CarList onSetCarsArray={handelSetCarArray} />
//       <CarValue value={carsArray} />
//     </div>
//   );
// }
