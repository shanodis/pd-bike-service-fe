import React from 'react';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ReadOnlyOrderTabs = () => {
  const { t } = useTranslation();
  return (
    <Nav variant="tabs">
      <Nav.Item className="primary-pills">
        <Nav.Link
          active
          className="border border-1 border-primary-lighter rounded-top fw-bold scale-up text-white">
          {t('servicePanel.informationsTab')}
        </Nav.Link>
      </Nav.Item>

      <Nav.Item className="primary-pills">
        <Nav.Link
          disabled
          className="border border-1 border-secondary-lighter rounded-top last-pill scale-down">
          {t('servicePanel.invoiceTab')}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default ReadOnlyOrderTabs;
