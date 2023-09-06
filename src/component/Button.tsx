import style from "./Button.module.scss";
import { ButtonHTMLAttributes, FC } from "react";
import { GoSync } from "react-icons/go";
export const Spinier: FC = () => {
  return (
    <div className={style["spinier-overlay"]}>
      <div className={style["spinier-container"]} />
    </div>
  );
};
export type ButtonTypes =
  | "primary"
  | "secondary"
  | "warning"
  | "success"
  | "danger";
type ButtonProps = {
  buttonType?: ButtonTypes;
  outline?: boolean;
  rounded?: boolean;
  loading?: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export const Button: FC<ButtonProps> = ({
  buttonType = "primary",
  outline = false,
  rounded = false,
  loading = false,
  children,
  ...rest
}) => {
  const buttonClass = [
    style["button-container"],
    style[buttonType],
    style[outline ? `outline-${buttonType}` : ""],
    style[rounded ? "rounded" : ""],
  ].join(" ");
  return (
    <button className={buttonClass} {...rest}>
      {loading ? <GoSync className={style["animate-spin"]} /> : children}
    </button>
  );
};

const ButtonType: ButtonTypes[] = [
  "primary",
  "secondary",
  "danger",
  "success",
  "warning",
];
const ButtonPage: FC = () => {
  return (
    <div className={style["buttons"]}>
      {ButtonType.map((type, id) => (
        <Button key={id} buttonType={type}>
          {type.toLocaleUpperCase()}
        </Button>
      ))}
      {ButtonType.map((type, id) => (
        <Button key={id} buttonType={type} outline>
          {type.toLocaleUpperCase()}
        </Button>
      ))}
      {ButtonType.map((type, id) => (
        <Button key={id} buttonType={type} rounded>
          {type.toLocaleUpperCase()}
        </Button>
      ))}
      {ButtonType.map((type, id) => (
        <Button key={id} buttonType={type} outline rounded>
          {type.toLocaleUpperCase()}
        </Button>
      ))}
    </div>
  );
};
export default ButtonPage;
