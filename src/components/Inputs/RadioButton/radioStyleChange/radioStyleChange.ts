export const radioStyleChange = (
  currentState: string | number | boolean,
  formikState: string | number | boolean,
  variants: string[]
) => {
  const [checked, unchecked] = variants;
  return currentState === formikState ? checked : unchecked;
};
