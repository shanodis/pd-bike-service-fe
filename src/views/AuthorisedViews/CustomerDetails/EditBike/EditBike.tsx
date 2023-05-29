import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import BikePhotos from './BikePhotos/BikePhotos';
import { useFetchData } from '../../../../hooks/useFetchData';
import { BikeResponse } from '../../../../interfaces/Bike/BikeResponse';
import Breadcrumbs from '../../../../components/Breadcrumbs/Breadcrumbs';
import { EditBikeValidationSchema } from '../../../../validation/validation';
import EditBikeForm from './EditBikeForm/EditBikeForm';
import SubmitButton from '../../../../components/SubmitButton/SubmitButton';
import { BikePhotosProvider } from '../../../../contexts/BikePhotosContext';
import { showErrorResponses } from '../../../../utils/showErrorResponses';
import { CustomerRequest } from '../../../../interfaces/Customer/CustomerRequest';

const bikeMapper = (data: BikeResponse) => ({
  ...data,
  labelYearOfProduction: data.yearOfProduction ? String(data.yearOfProduction) : ''
});

const EditBike = () => {
  const { t } = useTranslation();
  const { customerId }: { customerId: string } = useParams();
  const { bikeId }: { bikeId: string } = useParams();
  const [customerInfo] = useFetchData<CustomerRequest>(`/users/${customerId}/details`);
  const [showBikeDeleteModal, setShowBikeDeleteModal] = useState(false);
  const history = useHistory();

  const [bikeData, fetchBikeData] = useFetchData<BikeResponse>(
    `/bikes/${bikeId}`,
    dataMapper: bikeMapper
  );

  const editBikeBreadcrumbs = [
    { href: '/', name: t('breadcrumbs.dashboard') },
    { href: '/customers', name: t('breadcrumbs.customers') },
    {
      href: `/customers/${customerId}/about-customer`,
      name: [customerInfo?.firstName, customerInfo?.lastName].filter(Boolean).join(' ')
    },
    { href: `/customers/${customerId}/bikes`, name: t('breadcrumbs.registeredBikes') },
    { href: `/customers/${customerId}/bikes/edit-bike`, name: t('breadcrumbs.editBike') }
  ];

  const handleSubmit = async (values: BikeResponse) => {
    const putValues = { ...values, userId: customerId };
    try {
      await Axios.put(`/bikes/${bikeId}`, putValues);
      fetchBikeData().catch();
      toast.success(t('editBike.successSave'));
      history.push(`/customers/${customerId}/bikes`);
    } catch (e) {
      showErrorResponses(e);
    }
  };

  return (
    <BikePhotosProvider>
      <Container as="main">
        {customerInfo && bikeData ? (
          <>
            <Row
              as='header'
              className='justify-content-between'
            >
              <Breadcrumbs items={editBikeBreadcrumbs} />
            </Row>

            <Formik<BikeResponse>
              initialValues={bikeData}
              validationSchema={EditBikeValidationSchema}
              onSubmit={handleSubmit}
            >
              <div className="mt-5">
                <Form>
                  <Row>
                    <Col>
                      <BikePhotos />
                    </Col>

                    <Col xs={8}>
                      <EditBikeForm
                        showBikeDeleteModal={showBikeDeleteModal}
                        setShowBikeDeleteModal={setShowBikeDeleteModal}
                      />
                    </Col>
                  </Row>

                  <section
                    style={{ marginTop: '10rem' }}
                    className="d-flex justify-content-between">
                    <Button
                      variant="danger"
                      className="fw-bold"
                      onClick={() => setShowBikeDeleteModal(true)}
                    >
                      {t('editBike.delete')}
                    </Button>

                    <div className="text-end">
                      <Button
                        variant="secondary-light"
                        className="fw-bold"
                        onClick={() => history.push(`/customers/${customerId}/bikes`)}
                      >
                        {t('editBike.cancel')}
                      </Button>

                      <SubmitButton
                        type="submit"
                        variant="success-lighter"
                        className="text-white fw-bold ms-3">
                        {t('editBike.save')}
                      </SubmitButton>
                    </div>
                  </section>
                </Form>
              </div>
            </Formik>
          </>
        ) : (
          <Spinner
            animation='border'
            variant='primary'
            className='mt-5'
          />
        )}
      </Container>
    </BikePhotosProvider>
  );
};

export default EditBike;
