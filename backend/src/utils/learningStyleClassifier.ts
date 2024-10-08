export const classifyLearningStyle = (responses: number[]): string[] => {
  if (responses.length !== 44) {
    throw new Error('Invalid number of responses. Expected 44.');
  }

  let active = 0, reflective = 0;
  let sensing = 0, intuitive = 0;
  let visual = 0, verbal = 0;
  let sequential = 0, global = 0;

  for (let i = 0; i < 44; i++) {
    const response = responses[i];

    switch (i % 4) {
      case 0: // Active/Reflective
        if (response === 1) active++;
        else reflective++;
        break;
      case 1: // Sensing/Intuitive
        if (response === 1) sensing++;
        else intuitive++;
        break;
      case 2: // Visual/Verbal
        if (response === 1) visual++;
        else verbal++;
        break;
      case 3: // Sequential/Global
        if (response === 1) sequential++;
        else global++;
        break;
      default:
        break;
    }
  }

  const learningStyle: string[] = [
    active >= reflective ? 'Active' : 'Reflective',
    sensing >= intuitive ? 'Sensing' : 'Intuitive',
    visual >= verbal ? 'Visual' : 'Verbal',
    sequential >= global ? 'Sequential' : 'Global',
  ];

  return learningStyle;
};
