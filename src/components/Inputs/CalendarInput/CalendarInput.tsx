import React, { FC } from 'react';
import { useField } from 'formik';
import NumberFormat from 'react-number-format';
import { Form } from 'react-bootstrap';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import CalendarCustomHeader from './CalendarCustomHeader/CalendarCustomHeader';
import ReadonlyField from '../ReadonlyField/ReadonlyField';
import { format } from 'date-fns';

interface CalendarInputProps extends ReactDatePickerProps {
  name: string;
  rounded?: boolean;
  roundSide?: 'start' | 'end';
  readonly?: boolean;
  label?: string;
}

const CalendarInput: FC<CalendarInputProps> = ({
  name,
  readonly,
  label,
  roundSide,
  rounded,
  ...props
}) => {
  const [field] = useField(name);
  const { t } = useTranslation();
  const isRounded = () => (rounded ? 'rounded' : 'rounded-0');

  return (
    <>
      {!readonly ? (
        <ReactDatePicker
          {...props}
          renderCustomHeader={(params) => <CalendarCustomHeader {...params} />}
          selected={field.value && new Date(field.value)}
          todayButton={t('ordersTable.calendarTodayButton')}
          dateFormat="dd.MM.yyyy"
          showPopperArrow={false}
          placeholderText={t('ordersTable.calendarDateFormatPlaceholder')}
          customInput={
            <NumberFormat
              className={`custom-input shadow-none ${isRounded()} rounded-${roundSide}`}
              name={name}
              format="##.##.####"
              mask="_"
              customInput={Form.Control}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="true"
            />
          }
        />
      ) : (
        <ReadonlyField label={label}>
          <NumberFormat
            name={name}
            format="##.##.####"
            value={format(field.value, 'DD.MM.yyyy')}
            displayType="text"
          />
        </ReadonlyField>
      )}
    </>
  );
};

export default CalendarInput;
