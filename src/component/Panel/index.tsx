import style from "./Panel.module.scss";
type Panel = {
  className: string;
} & React.PropsWithChildren &
  React.AllHTMLAttributes<HTMLDivElement>;
export function Panel({ children, className, ...rest }: Panel) {
  const classStyle = [style["panel"], className].join(" ");
  return (
    <div {...rest} className={classStyle}>
      {children}
    </div>
  );
}
