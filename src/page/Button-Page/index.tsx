import style from "./ButtonPage.module.scss";
import { Button, ButtonTypes } from "../../component";
const ButtonType: ButtonTypes[] = [
  "primary",
  "secondary",
  "danger",
  "success",
  "warning",
];
export function ButtonPage() {
  return (
    <div className={style["button-container"]}>
      <div className={style["button-table"]}>
        <div className={style["button-row"]}>
          {ButtonType.map((type, id) => (
            <Button key={id} buttonType={type}>
              {type.toLocaleUpperCase()}
            </Button>
          ))}
        </div>
        <div className={style["button-row"]}>
          {ButtonType.map((type, id) => (
            <Button key={id} buttonType={type} outline>
              {type.toLocaleUpperCase()}
            </Button>
          ))}
        </div>
        <div className={style["button-row"]}>
          {ButtonType.map((type, id) => (
            <Button key={id} buttonType={type} rounded>
              {type.toLocaleUpperCase()}
            </Button>
          ))}
        </div>
        <div className={style["button-row"]}>
          {ButtonType.map((type, id) => (
            <Button key={id} buttonType={type} outline rounded>
              {type.toLocaleUpperCase()}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
