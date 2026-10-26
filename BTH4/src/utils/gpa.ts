import { Grade } from '../types';

export function toScale4(score10: number): { gpa4: number; letter: string } {
  if (score10 >= 8.5) return { gpa4: 4.0, letter: 'A' };
  if (score10 >= 8.0) return { gpa4: 3.5, letter: 'B+' };
  if (score10 >= 7.0) return { gpa4: 3.0, letter: 'B' };
  if (score10 >= 6.5) return { gpa4: 2.5, letter: 'C+' };
  if (score10 >= 5.5) return { gpa4: 2.0, letter: 'C' };
  if (score10 >= 5.0) return { gpa4: 1.5, letter: 'D+' };
  if (score10 >= 4.0) return { gpa4: 1.0, letter: 'D' };
  return { gpa4: 0.0, letter: 'F' };
}

export function calcGpa(grades: Grade[]) {
  if (!grades || grades.length === 0) {
    return { gpa: '0.00', totalCredits: 0 };
  }

  let totalWeightedScore = 0;
  let totalCreditsForGpa = 0;
  let totalAccumulatedCredits = 0;

  grades.forEach((g) => {
    const credits = g.course?.credits || 3;
    const { gpa4, letter } = toScale4(g.total);

    totalWeightedScore += gpa4 * credits;
    totalCreditsForGpa += credits;

    if (letter !== 'F') {
      totalAccumulatedCredits += credits;
    }
  });

  const gpa =
    totalCreditsForGpa > 0
      ? (totalWeightedScore / totalCreditsForGpa).toFixed(2)
      : '0.00';

  return {
    gpa,
    totalCredits: totalAccumulatedCredits,
  };
}