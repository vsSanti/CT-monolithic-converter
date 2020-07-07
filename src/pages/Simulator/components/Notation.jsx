import React from 'react';
import { Row, Col, Typography } from 'antd';

const { Text } = Typography;

const Notation = ({ stepsInNotation }) => {
  return (
    <div>
      <Row align="middle" justify="center">
        <Col span={4} />
        <Col span={10} className="text-center">
          <Text strong>Verdadeiro</Text>
        </Col>
        <Col span={10} className="text-center">
          <Text strong>Falso</Text>
        </Col>
      </Row>
      {stepsInNotation.map((step, index) => (
        <Row align="middle" justify="center">
          <Col span={4} className="text-right">
            <Text strong>{index + 1}:</Text>
          </Col>
          <Col span={10} className="text-center">
            <Text>
              ({step.caseTrue.label}, {step.caseTrue.goTo})
            </Text>
          </Col>
          <Col span={10} className="text-center">
            <Text>
              ({step.caseFalse.label}, {step.caseFalse.goTo})
            </Text>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Notation;
