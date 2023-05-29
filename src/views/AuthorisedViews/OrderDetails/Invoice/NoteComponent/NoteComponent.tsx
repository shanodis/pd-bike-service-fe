import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import Axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { CheckLg, PencilFill } from 'react-bootstrap-icons';
import returnButton from '../../../../../assets/img/returnButton.svg';
import { showErrorResponses } from '../../../../../utils/showErrorResponses';
import { useOrder } from '../../../../../contexts/OrderContext';
import SubmitButton from '../../../../../components/SubmitButton/SubmitButton';
import TextInput from '../../../../../components/Inputs/TextInput/TextInput';

interface NoteInterface {
  note?: string;
}

const NoteComponent = () => {
  const { orderId }: { orderId: string } = useParams();
  const [disable, setDisable] = useState(true);
  const { t } = useTranslation();

  const { invoice } = useOrder();
  const { isReadOnly, data, fetchData } = invoice || {};
  const { note } = data || {};

  const initialValues = useMemo(() => ({ note }), [note]);

  const handleSubmit = async (values: NoteInterface): Promise<void> => {
    try {
      await Axios.patch(`/orders/${orderId}/order-note`, values.note);
      setDisable(!disable);
      await fetchData();
    } catch (e) {
      showErrorResponses(e);
    }
  };

  return (
    <div className="mt-5 mx-1">
      <Formik<NoteInterface>
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}>
        {({ resetForm }) => (
          <Form noValidate className="position-relative note">
            {!isReadOnly && (
              <div className="position-absolute button-wrapper">
                {disable ? (
                  <Button
                    variant="info"
                    className="rounded-circle buttons-position"
                    onClick={() => setDisable(!disable)}>
                    <PencilFill />
                  </Button>
                ) : (
                  <div>
                    <Button
                      variant="warning"
                      type="reset"
                      className="rounded-circle buttons-position float-start mx-1"
                      onClick={() => {
                        resetForm();
                        setDisable(!disable);
                      }}>
                      <img alt="" src={returnButton} className="reset-icon-wrapper" />
                    </Button>

                    <SubmitButton
                      hideChildrenOnLoad
                      variant="success"
                      className="rounded-circle buttons-position"
                      disabled={isReadOnly}
                      type="submit">
                      <CheckLg />
                    </SubmitButton>
                  </div>
                )}
              </div>
            )}

            <TextInput
              name="note"
              label={t('servicePanel.note')}
              className="text-box"
              as="textarea"
              required
              rows={4}
              maxLength={1000}
              disabled={disable}
              readOnly={disable}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NoteComponent;
