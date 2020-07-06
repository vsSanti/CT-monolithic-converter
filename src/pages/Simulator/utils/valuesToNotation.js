import transformSteps from './transformSteps';

const createCase = (step, transformedSteps, caseBoolean = '') => {
  let newObject = {};
  if (step[caseBoolean] === 'stop') {
    newObject = {
      label: 'parada',
      goTo: 'e',
    };
  }

  return {
    label:
      step.category === 'operation'
        ? step.label
        : transformedSteps[step[caseBoolean]]?.label,
    goTo: step[caseBoolean] + 1,
    ...newObject,
  };
};

const valuesToNotation = ({ steps = [] }) => {
  const transformedSteps = transformSteps(steps);

  const stack = [];
  transformedSteps.forEach((step) => {
    stack.push({
      caseTrue: createCase(step, transformedSteps, 'caseTrue'),
      caseFalse: createCase(step, transformedSteps, 'caseFalse'),
    });
  });

  // console.log(stack);
};

export default valuesToNotation;
