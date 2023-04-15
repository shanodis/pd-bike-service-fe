import React, { FC } from 'react';
import { Button, ButtonProps, Spinner } from 'react-bootstrap';
import { useFormikContext } from 'formik';

interface SubmitButtonProps extends ButtonProps {
  hideChildrenOnLoad?: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({
  children,
  hideChildrenOnLoad = false,
  ...props
}) => {
  const { isSubmitting } = useFormikContext();
  return (
    <Button {...props} type="submit" disabled={props.disabled || isSubmitting}>
      <>
        {isSubmitting && (
          <span className="me-1">
            <Spinner animation="border" size="sm" />
          </span>
        )}

        {!(hideChildrenOnLoad && isSubmitting) && children}
      </>
    </Button>
  );
};

export default SubmitButton;
