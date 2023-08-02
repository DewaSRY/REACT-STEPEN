import style from "./ModelPage.module.scss";
import { Button } from "../../component";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
interface Model {
  children: React.ReactNode;
  actionBar: React.ReactNode;
}
function Modal({ children, actionBar }: Model) {
  const modalPortal = document.getElementById("modal") as HTMLElement;
  useEffect(() => {
    document.body.classList.add(style["overflow-hidden"]);
    return () => {
      document.body.classList.remove(style["overflow-hidden"]);
    };
  }, []);
  const ModalDisplay = () => (
    <div className={style.container}>
      <div className={style["model-info"]}>
        <div>
          {children}
          <div>{actionBar}</div>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(<ModalDisplay />, modalPortal);
}
export function ModalPage() {
  const [showModal, setShowModal] = useState(false);
  const actionPart = (
    <Button
      onClick={() => setShowModal((prev) => !prev)}
      buttonType="primary"
      rounded
    >
      Close
    </Button>
  );
  const modal = (
    <Modal actionBar={actionPart}>
      <h1>Here is an important agreement for you to accept</h1>
    </Modal>
  );
  return (
    <div>
      <Button
        onClick={() => setShowModal((prev) => !prev)}
        buttonType="primary"
      >
        Open Model
      </Button>
      {showModal && modal}
      <div className={style.para}>
        <p>
          The Sun is the star at the center of the Solar System. It is a nearly
          perfect ball of hot plasma, heated to incandescence by nuclear fusion
          reactions in its core. The Sun radiates this energy mainly as light,
          ultraviolet, and infrared radiation, and is the most important source
          of energy for life on Earth.
        </p>
        <p>
          The Sun is the star at the center of the Solar System. It is a nearly
          perfect ball of hot plasma, heated to incandescence by nuclear fusion
          reactions in its core. The Sun radiates this energy mainly as light,
          ultraviolet, and infrared radiation, and is the most important source
          of energy for life on Earth.
        </p>
        <p>
          The Sun is the star at the center of the Solar System. It is a nearly
          perfect ball of hot plasma, heated to incandescence by nuclear fusion
          reactions in its core. The Sun radiates this energy mainly as light,
          ultraviolet, and infrared radiation, and is the most important source
          of energy for life on Earth.
        </p>
        <p>
          The Sun is the star at the center of the Solar System. It is a nearly
          perfect ball of hot plasma, heated to incandescence by nuclear fusion
          reactions in its core. The Sun radiates this energy mainly as light,
          ultraviolet, and infrared radiation, and is the most important source
          of energy for life on Earth.
        </p>
        <p>
          The Sun is the star at the center of the Solar System. It is a nearly
          perfect ball of hot plasma, heated to incandescence by nuclear fusion
          reactions in its core. The Sun radiates this energy mainly as light,
          ultraviolet, and infrared radiation, and is the most important source
          of energy for life on Earth.
        </p>
        <p>
          The Sun is the star at the center of the Solar System. It is a nearly
          perfect ball of hot plasma, heated to incandescence by nuclear fusion
          reactions in its core. The Sun radiates this energy mainly as light,
          ultraviolet, and infrared radiation, and is the most important source
          of energy for life on Earth.
        </p>
      </div>
    </div>
  );
}
