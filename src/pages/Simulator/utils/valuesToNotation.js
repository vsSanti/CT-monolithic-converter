import lodash from 'lodash';

import transformSteps from './transformSteps';

const createCase = (step, transformedSteps, caseBoolean = '') => {
  let newObject;

  if (step[caseBoolean] === 'stop') {
    newObject = {
      label: 'parada',
      goTo: 'e',
    };
  }

  if (step.category === 'test' && !newObject) {
    let nextStep = transformedSteps[step[caseBoolean]];
    let cont = 0;

    if (nextStep?.category === 'test') cont = 1;

    while (nextStep?.category === 'test' && nextStep[caseBoolean] !== 'stop') {
      if (lodash.isEqual(step, nextStep)) {
        break;
      }
      nextStep = transformedSteps[nextStep[caseBoolean]];
    }

    if (lodash.isEqual(step, nextStep)) {
      newObject = {
        label: 'ciclo',
        goTo: 'w',
      };
    } else {
      newObject = {
        label: nextStep?.label,
        goTo: nextStep[caseBoolean] + cont,
      };
    }
  }

  if (!newObject) newObject = {};

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
  console.log({ steps, transformedSteps });

  const stack = [];
  transformedSteps.forEach((step) => {
    stack.push({
      caseTrue: createCase(step, transformedSteps, 'caseTrue'),
      caseFalse: createCase(step, transformedSteps, 'caseFalse'),
    });
  });

  console.log(lodash.uniqWith(stack, lodash.isEqual));
};

export default valuesToNotation;
