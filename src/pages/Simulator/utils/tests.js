const tests = [
  {
    steps: [
      {
        category: 'test',
        caseTrue: 1,
        caseFalse: 2,
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
        caseTrue: 0,
        caseFalse: 4,
      },
      {
        category: 'operation',
        goTo: 'stop',
      },
    ],
  },
  {
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
  },
  {
    steps: [
      {
        category: 'operation',
        goTo: 1,
      },
      {
        category: 'test',
        caseTrue: 2,
        caseFalse: 0,
      },
      {
        category: 'operation',
        goTo: 'stop',
      },
    ],
  },
  {
    steps: [
      {
        category: 'test',
        caseTrue: 2,
        caseFalse: 1,
      },
      {
        category: 'operation',
        goTo: 0,
      },
      {
        category: 'operation',
        goTo: 'stop',
      },
    ],
  },
];

export default tests;
