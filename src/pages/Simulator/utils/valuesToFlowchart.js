import alphabet from './alphabet';
import transformSteps from './transformSteps';

const createDeclaration = (steps) => {
  const alphabetCopy = [...alphabet];

  const instructions = steps.map((step) =>
    step.category === 'operation'
      ? {
          label: `operation${step.id}`,
          instruction: `operation${step.id}=>operation: ${alphabetCopy.shift()}`,
        }
      : {
          label: `test${step.id}`,
          instruction: `test${step.id}=>condition: T`,
        }
  );

  return instructions;
};

const createInstructions = (step, index, declaration) => {
  let str = '';
  const { label } = declaration[index];

  if (!index) str = `st->${label}\n`;

  if (step.category === 'operation') {
    str += `${label}->${declaration[step.caseTrue]?.label || 'e'}`;
  } else if (step.category === 'test') {
    str += `${label}(yes)->${declaration[step.caseTrue]?.label || 'e'}\n`;
    str += `${label}(no)->${declaration[step.caseFalse]?.label || 'e'}`;
  }

  return str;
};

const valuesToFlowchart = ({ steps }) => {
  const transformedSteps = transformSteps(steps);

  const declaration = createDeclaration(transformedSteps);

  const instructions = transformedSteps.map((step, index) =>
    createInstructions(step, index, declaration)
  );

  const newCode = `
  st=>start: Partida
  e=>end: Parada
  ${declaration.map((d) => d.instruction).join('\n')}

  ${instructions.join('\n')}
`;

  return newCode;
};

export default valuesToFlowchart;
