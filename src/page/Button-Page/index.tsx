import style from "./ButtonPage.module.scss";
import { Button, ButtonTypes } from "../../component/Button";
const ButtonType = ["primary", "secondary", "danger", "success", "warning"];
export function ButtonPage() {
  return (
    <div className={style["button-container"]}>
      <div className={style["button-row"]}>
        {ButtonType.map((type, id) => (
          <Button key={id} buttonType={type as ButtonTypes}>
            {type.toLocaleUpperCase()}
          </Button>
        ))}
      </div>
      <div className={style["button-row"]}>
        {ButtonType.map((type, id) => (
          <Button key={id} buttonType={type as ButtonTypes} outline>
            {type.toLocaleUpperCase()}
          </Button>
        ))}
      </div>
      <div className={style["button-row"]}>
        {ButtonType.map((type, id) => (
          <Button key={id} buttonType={type as ButtonTypes} rounded>
            {type.toLocaleUpperCase()}
          </Button>
        ))}
      </div>
      <div className={style["button-row"]}>
        {ButtonType.map((type, id) => (
          <Button key={id} buttonType={type as ButtonTypes} outline rounded>
            {type.toLocaleUpperCase()}
          </Button>
        ))}
      </div>
    </div>
  );
}
