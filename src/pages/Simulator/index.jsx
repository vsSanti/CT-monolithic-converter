import React, { useCallback, useState } from 'react';
import { Form, Button, Typography, Select, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Flowchart from 'react-simple-flowchart';

import Wrapper from 'pages/wrapper';

import './styles.less';
import valuesToNotation from './utils/valuesToNotation';

const { Option } = Select;
const { Title, Paragraph, Text } = Typography;

const exampleValue = {
  steps: [
    {
      category: 'operation',
      goTo: 1,
    },
    {
      category: 'test',
      caseTrue: 0,
      caseFalse: 2,
    },
    {
      category: 'operation',
      goTo: 3,
    },
    {
      category: 'test',
      caseTrue: 'stop',
      caseFalse: 0,
    },
  ],
};

const options = {
  x: 0,
  y: 0,
  'line-width': 3,
  'line-length': 50,
  'text-margin': 10,
  'font-size': 14,
  'font-color': 'black',
  'line-color': 'black',
  'element-color': 'black',
  fill: 'white',
  'yes-text': 'yes',
  'no-text': 'no',
  'arrow-end': 'block',
  scale: 1,
  symbols: {
    start: {
      'font-color': 'red',
      'element-color': 'green',
      'font-weight': 'bold',
    },
    end: {
      'font-color': 'red',
      'element-color': 'green',
      'font-weight': 'bold',
    },
  },
  flowstate: {
    department1: { fill: 'pink' },
    department2: { fill: 'yellow' },
    external: { fill: 'green' },
  },
};

const Simulator = () => {
  const [stepsList, setStepsList] = useState([]);
  const [code, setCode] = useState(`
    st=>start: Begin
    e=>end: End
    st->e
  `);

  const onFinish = useCallback((values) => {
    console.log(values);
  }, []);

  const handleOnSelectChange = useCallback((value, fieldName) => {
    setStepsList((state) => {
      const newState = [...state];
      newState[fieldName].category = value;
      return [...newState];
    });
  }, []);

  const handleRemoveItem = useCallback((remove, fieldName) => {
    setStepsList((state) => {
      const newState = state.filter((_, i) => i !== fieldName);
      return [...newState];
    });
    remove(fieldName);
  }, []);

  const handleAddItem = useCallback((add) => {
    setStepsList((state) => [
      ...state,
      {
        id: !state.length ? 1 : state[state.length - 1].id + 1,
        category: undefined,
      },
    ]);
    add();
  }, []);

  const renderSelect = useCallback(
    (placeholder) => (
      <Select placeholder={placeholder}>
        <Option value="stop">Parada</Option>
        {stepsList.map((step, index) => (
          <Option key={step.id} value={index}>
            {index + 1}
          </Option>
        ))}
      </Select>
    ),
    [stepsList]
  );

  const renderFlowchartCode = () => {
    const newCode = `st=>start: Begin
    e=>end: End
    op1=>operation: Operation 1|department1
    op2=>operation: Operation 2|department2
    sub=>subroutine: Go To Google|external:>http://www.google.com
    cond=>condition: Google?
    st(right)->op1(right)->op2(right)->cond(yes)->sub(bottom)
    cond(no)->e`;

    setCode(newCode);
  };

  return (
    <Wrapper>
      <div id="simulator-component">
        <Title>Conversor de um programa monolítico</Title>
        <Paragraph>
          Nessa parte do programa você deve descrever o que o programa irá realizar, para
          então ser gerado o programa convertido para monolítico com instruções rotuladas
          e seu respectivo fluxograma
        </Paragraph>

        <Form name="steps_form" onFinish={onFinish}>
          <Form.List name="steps">
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map((field, index) => (
                    <Row key={field.key} align="middle">
                      <Col span={1} className="flex center">
                        <MinusCircleOutlined
                          className="remove-btn"
                          onClick={() => handleRemoveItem(remove, field.name)}
                        />
                      </Col>

                      <Col span={1} className="flex center">
                        <Text strong>{index + 1}:</Text>
                      </Col>

                      <Col span={6}>
                        <Form.Item
                          {...field}
                          label="Categoria"
                          name={[field.name, 'category']}
                          fieldKey={[field.fieldKey, 'category']}
                        >
                          <Select
                            onChange={(value) => handleOnSelectChange(value, field.name)}
                            className="category-select"
                            placeholder="Selecione a categoria"
                          >
                            <Option value="test">Teste</Option>
                            <Option value="operation">Operação</Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      {stepsList[field.name].category === 'test' && (
                        <>
                          <Col span={4}>
                            <Form.Item
                              {...field}
                              label="Verdadeiro"
                              name={[field.name, 'caseTrue']}
                              fieldKey={[field.fieldKey, 'caseTrue']}
                            >
                              {renderSelect('Caso verdadeiro')}
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item
                              {...field}
                              label="Falso"
                              name={[field.name, 'caseFalse']}
                              fieldKey={[field.fieldKey, 'caseFalse']}
                            >
                              {renderSelect('Caso falso')}
                            </Form.Item>
                          </Col>
                        </>
                      )}
                      {stepsList[field.name].category === 'operation' && (
                        <Col span={4}>
                          <Form.Item
                            {...field}
                            label="Ir para"
                            name={[field.name, 'goTo']}
                            fieldKey={[field.fieldKey, 'goTo']}
                          >
                            {renderSelect('Ir para')}
                          </Form.Item>
                        </Col>
                      )}
                    </Row>
                  ))}

                  <Button
                    className="mrg-top-15"
                    type="dashed"
                    onClick={() => handleAddItem(add)}
                    block
                  >
                    <PlusOutlined /> Adicionar instrução
                  </Button>
                </>
              );
            }}
          </Form.List>

          <Button
            type="primary"
            htmlType="submit"
            className="mrg-top-15"
            block
            disabled={!stepsList.length}
          >
            Converter
          </Button>
          <Button
            type="primary"
            className="mrg-top-15"
            block
            onClick={() => {
              renderFlowchartCode();
              valuesToNotation(exampleValue);
            }}
          >
            Calcular
          </Button>
        </Form>
      </div>
      <div>
        <Flowchart
          chartCode={code}
          options={options}
          // onClick={(elementText) => this.setState({ elementText })}
        />
      </div>
    </Wrapper>
  );
};

export default Simulator;
