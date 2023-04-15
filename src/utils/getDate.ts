import { format } from "date-fns";

export const getDate = (ISODate: string, dateFormat = 'DD.MM.YYYY') => format(new Date(ISODate), dateFormat) || null;