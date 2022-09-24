import { ConfirmationRoot } from "./ConfirmationContext";

export function RootContext({ children }) {
  return (
    <>
      <ConfirmationRoot>{children}</ConfirmationRoot>
    </>
  );
}
