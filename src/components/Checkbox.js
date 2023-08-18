import React from "react";

const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef(); // this is the default ref that we will use if the ref is not passed in
  const resolvedRef = ref || defaultRef; // this is the resolved ref that we will use
  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate; // this is the effect that we will use to set the indeterminate property of the checkbox
  }, [resolvedRef, indeterminate]);
  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

export default Checkbox;