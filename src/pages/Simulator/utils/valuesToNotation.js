import lodash from 'lodash';

import transformSteps from './transformSteps';

const createCase = (step, transformedSteps, caseBoolean = '') => {
  let newObject;

  if (String(step[caseBoolean]).includes('stop')) {
    newObject = {
      label: 'parada',
      goTo: 'e',
    };
  }

  if (step.category === 'test' && !newObject) {
    let nextStep = transformedSteps[step[caseBoolean]];
    let controlCont = 0;

    while (
      nextStep?.category === 'test' &&
      nextStep[caseBoolean] !== 'stop' &&
      controlCont < 100
    ) {
      if (lodash.isEqual(step, nextStep)) {
        break;
      }
      nextStep = transformedSteps[nextStep[caseBoolean]];
      controlCont += 1;
    }

    if (lodash.isEqual(step, nextStep) || controlCont === 100) {
      newObject = {
        label: 'ciclo',
        goTo: 'w',
      };
    } else if (nextStep[caseBoolean] === 'stop' || nextStep?.category === 'operation') {
      newObject = {
        label: nextStep?.label,
        goTo: nextStep?.id + 1,
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
  // console.log({ steps, transformedSteps });

  let stack = [];
  transformedSteps.forEach((step) => {
    stack = [
      ...stack,
      {
        caseTrue: createCase(step, transformedSteps, 'caseTrue'),
        caseFalse: createCase(step, transformedSteps, 'caseFalse'),
      },
    ];
  });

  const uniqueSteps = lodash.uniqWith(stack, lodash.isEqual);
  // console.log(uniqueSteps);

  return uniqueSteps;
};

export default valuesToNotation;
