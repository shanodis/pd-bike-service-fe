import React, { FC } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDoubleLeft,
  ChevronDoubleRight
} from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

interface RenderCustomHeaderParams {
  monthDate?: Date;
  date?: Date;
  changeYear?: (year: number) => void;
  changeMonth?: (month: number) => void;
  customHeaderCount?: number;
  decreaseMonth?: () => void;
  increaseMonth?: () => void;
  prevMonthButtonDisabled?: boolean;
  nextMonthButtonDisabled?: boolean;
  decreaseYear?: () => void;
  increaseYear?: () => void;
  prevYearButtonDisabled?: boolean;
  nextYearButtonDisabled?: boolean;
}

const CalendarCustomHeader: FC<RenderCustomHeaderParams> = ({
  increaseYear,
  decreaseYear,
  increaseMonth,
  decreaseMonth,
  date
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="border-bottom border-secondary text-start pb-1">
        <span className="text-secondary ms-2">{t('ordersTable.calendarSelectDateLabel')}</span>
      </div>

      <div className="d-flex justify-content-around align-items-center mt-2 fs-6">
        <div className="mb-1">
          <ChevronDoubleLeft onClick={decreaseYear} />

          <ChevronLeft onClick={decreaseMonth} />
        </div>

        <span className="fw-bold text-dark">{format(date || new Date(), 'MM.yyyy')}</span>

        <div className="mb-1">
          <ChevronRight onClick={increaseMonth} />

          <ChevronDoubleRight onClick={increaseYear} />
        </div>
      </div>
    </>
  );
};

export default CalendarCustomHeader;
