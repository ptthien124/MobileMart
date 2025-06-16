import { Col, Row } from 'antd';
import type { PropsWithChildren } from 'react';
import Card, { type CardProps } from '../card';

type CardsProps = PropsWithChildren & {
  items: CardProps[];
};

const Cards = (props: CardsProps) => {
  const { items } = props;

  return (
    <Row gutter={[16, 16]}>
      {items.map((item) => {
        return (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} key={item.name}>
            <Card {...item} />
          </Col>
        );
      })}
    </Row>
  );
};

export default Cards;
