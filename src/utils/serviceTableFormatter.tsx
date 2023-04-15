import React from 'react';
import { Badge, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { OrderListResponse } from "../interfaces/Order/OrderListResponse";

export const serviceTableFormatter = (cell: OrderListResponse, row: OrderListResponse) => (
  <div className="d-flex gap-2">
    <div
      style={{ textOverflow: "ellipsis", overflow: 'hidden' }}
      className='text-wrap'
    >
      {row?.servicesNames?.[0] ?? "-"}
    </div>

    <div className='p-0 m-0'>
      <OverlayTrigger
        delay={{ hide: 450, show: 300 }}
        overlay={
          <Tooltip id="serviceTooltip">
            <Container className='p-1 m-0'>
                <span className="tooltip-style">
                  {row?.servicesNames?.map((item) =>
                    <p key={item} className='mt-2 mb-2'>{item}</p>,
                  )}
                </span>
            </Container>
          </Tooltip>
        }
        placement="bottom"
      >
        <Badge
          pill
          bg="primary-bright"
          className="mx-1"
        >
          {row?.servicesNames?.length > 1 &&
          <span>+{row?.servicesNames?.length - 1}</span>}
        </Badge>
      </OverlayTrigger>
    </div>
  </div>
);
