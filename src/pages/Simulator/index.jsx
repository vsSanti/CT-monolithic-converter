import React, { useCallback, useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Select, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import Wrapper from 'pages/wrapper';

import './styles.less';

const { Option } = Select;
const { Title, Paragraph, Text } = Typography;

const Simulator = () => {
  const [stepsList, setStepsList] = useState([]);

  useEffect(() => {
    console.log(stepsList);
  }, [stepsList]);

  const onFinish = useCallback((values) => {
    console.log('Received values of form:', values);
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
        category: undefined,
      },
    ]);
    add();
  }, []);

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
                      <Col span={1} className="flex end">
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
                              <Input placeholder="Caso verdadeiro" />
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item
                              {...field}
                              label="Falso"
                              name={[field.name, 'caseFalse']}
                              fieldKey={[field.fieldKey, 'caseFalse']}
                            >
                              <Input placeholder="Caso falso" />
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
                            <Input placeholder="Ir para" />
                          </Form.Item>
                        </Col>
                      )}

                      <Col span={1}>
                        <MinusCircleOutlined
                          className="remove-btn"
                          onClick={() => handleRemoveItem(remove, field.name)}
                        />
                      </Col>
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
        </Form>
      </div>
    </Wrapper>
  );
};

export default Simulator;
