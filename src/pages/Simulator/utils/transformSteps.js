import alphabet from './alphabet';

const transformSteps = (steps) => {
  const transformedSteps = steps.map((step, index) => ({
    id: index,
    category: step.category,
    label: step.category === 'test' ? `T${index}` : alphabet[index],
    caseTrue: step.category === 'test' ? step.caseTrue : step.goTo,
    caseFalse: step.category === 'test' ? step.caseFalse : step.goTo,
  }));

  return transformedSteps;
};

export default transformSteps;
