// import propTypes from "prop-types";
import { GoSync } from "react-icons/go";
import style from "./Button.module.scss";
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
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  buttonType = "primary",
  outline = false,
  rounded = false,
  loading = false,
  children,
  ...rest
}: ButtonProps) {
  const buttonClass = [
    style["button-container"],
    style[buttonType],
    style[outline ? `outline-${buttonType}` : ""],
    style[rounded ? "rounded" : ""],
  ].join(" ");
  return (
    <button className={buttonClass} {...rest}>
      {/* <GoSync /> */}
      {loading ? <GoSync className={style["animate-spin"]} /> : children}
    </button>
  );
}

export function Spinier() {
  return (
    <div className={style["spinier-overlay"]}>
      <div className={style["spinier-container"]} />
    </div>
  );
}
// export function Button({}) {
//   // const classes = className(

//   // );

// //   return (
// //     <button {...rest} disabled={loading} className={classes}>
// //       {loading ? <GoSync className="animate-spin" /> : children}
// //     </button>
// //   );
// }
