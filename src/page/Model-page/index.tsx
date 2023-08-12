import style from "./ModelPage.module.scss";
import { Button } from "../../component";
import { useState, useEffect, FC } from "react";
import ReactDOM from "react-dom";
interface Model {
  children: React.ReactNode;
}
const Modal: FC<Model> = ({ children }) => {
  const modalPortal = document.getElementById("modal") as HTMLElement;
  useEffect(() => {
    document.body.classList.add(style["overflow-hidden"]);
    return () => {
      document.body.classList.remove(style["overflow-hidden"]);
    };
  }, []);
  const ModalDisplay: FC = () => (
    <div className={style["model-container"]}>
      <div>{children}</div>
    </div>
  );
  return ReactDOM.createPortal(<ModalDisplay />, modalPortal);
};
interface ModelCardProps {
  modelHandler: () => void;
}
const ModelCard: FC<ModelCardProps> = ({ modelHandler }) => {
  return (
    <Modal>
      <div className={style["model-info"]}>
        <h1>Here is an important agreement for you to accept</h1>
        <Button onClick={modelHandler} buttonType="primary" rounded>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export function ModalPage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={style["container"]}>
      <Button
        onClick={() => setShowModal((prev) => !prev)}
        buttonType="primary"
      >
        Open Model
      </Button>
      {showModal ? (
        <ModelCard modelHandler={() => setShowModal((prev) => !prev)} />
      ) : null}
      <div className={style["useful-info"]}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam
        veritatis cupiditate commodi, accusantium ut aliquid soluta. Dolorum
        deleniti assumenda dignissimos vero quo quod aperiam porro. Dolores
        saepe eos iste nam culpa voluptate totam non.
      </div>
    </div>
  );
}
