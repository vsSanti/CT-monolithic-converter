import transformSteps from './transformSteps';

const valuesToNotation = ({ steps = [] }) => {
  const transformedSteps = transformSteps(steps);

  const stack = [];
  transformedSteps.forEach((step) => {
    const newObject = {};
    if (step.caseTrue === 'stop') {
      newObject.caseTrue = {
        label: 'parada',
        goTo: 'e',
      };
    }

    if (step.caseFalse === 'step') {
      newObject.caseFalse = {
        label: 'parada',
        goTo: 'e',
      };
    }

    stack.push({
      caseTrue: {
        label:
          step.category === 'operation'
            ? step.label
            : transformedSteps[step.caseTrue]?.label,
        goTo: step.caseTrue + 1,
      },
      caseFalse: {
        label:
          step.category === 'operation'
            ? step.label
            : transformedSteps[step.caseFalse]?.label,
        goTo: step.caseFalse + 1,
      },
      ...newObject,
    });
  });

  // console.log(stack);
};

export default valuesToNotation;
