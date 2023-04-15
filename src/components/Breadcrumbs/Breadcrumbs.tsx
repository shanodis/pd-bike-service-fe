import React, { FC } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  items: { name: string; href: string }[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  const lastItem = items.pop();
  return (
    <Breadcrumb className="mt-5">
      {items.map((item) => (
        <Breadcrumb.Item
          key={item.name}
          linkProps={{ to: item.href, className: 'text-decoration-none text-secondary' }}
          linkAs={Link}>
          {item.name}
        </Breadcrumb.Item>
      ))}
      <Breadcrumb.Item className="fw-bold text-dark" active>
        {lastItem?.name}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
