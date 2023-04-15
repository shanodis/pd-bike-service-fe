import React from 'react';
import { OrderListResponse } from "../interfaces/Order/OrderListResponse";
import { i18n } from "../assets/i18next/i18n";

const progressTableFormatter = (cell: string, row: OrderListResponse) => {
  switch (row.orderStatusName) {
    case "received":
      return <span className="status received spacing"><b>{i18n.t("ordersTable.received")}</b></span>;
    case "in-progress":
      return <span><b className="status in-progress spacing">{i18n.t("ordersTable.in-progress")}</b></span>;
    case "done":
      return <span><b className="status done spacing">{i18n.t("ordersTable.done")}</b></span>;
    default:
      return <span className="status todo spacing"><b>{i18n.t("ordersTable.todo")}</b></span>;
  }
};

export default progressTableFormatter;
