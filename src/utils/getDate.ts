import { format, parseISO } from 'date-fns';

export const getDate = (ISODate: string, dateFormat = 'dd.MM.yyyy') => format(parseISO(ISODate), 'dd.MM.yyyy');
