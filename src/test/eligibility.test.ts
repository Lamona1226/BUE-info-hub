import { describe, expect, it } from 'vitest';
import {
  calculateAmericanDiplomaPercentage,
  calculateEligibilityForFees,
  calculateThanaweyaPercentage,
  normalizeCertificateType,
  normalizeIgcseGradeToPercentage,
  resolveScholarshipTier,
} from '@/lib/eligibility';
import { egyptianTuitionFees } from '@/data/fees';

describe('eligibility utilities', () => {
  it('normalizes certificate labels to threshold keys', () => {
    expect(normalizeCertificateType('Other international certificates')).toBe('igcse');
    expect(normalizeCertificateType('Arab certificate')).toBe('arab');
    expect(normalizeCertificateType('Thanaweya Amma')).toBe('thanwya');
    expect(normalizeCertificateType('American Diploma')).toBe('american');
  });

  it('maps IGCSE grades correctly', () => {
    expect(normalizeIgcseGradeToPercentage('A*')).toBe(100);
    expect(normalizeIgcseGradeToPercentage('7')).toBe(95);
    expect(normalizeIgcseGradeToPercentage('4')).toBe(70);
    expect(normalizeIgcseGradeToPercentage('X')).toBeNull();
  });

  it('calculates scholarship tiers in descending order A* -> A -> B -> C', () => {
    expect(resolveScholarshipTier(98, { B: '85%', A: '90%', AStar: '98%' })).toBe('AStar');
    expect(resolveScholarshipTier(93, { B: '85%', A: '90%', AStar: '98%' })).toBe('A');
    expect(resolveScholarshipTier(86, { B: '85%', A: '90%', AStar: '98%' })).toBe('B');
    expect(resolveScholarshipTier(80, { B: '85%', A: '90%', AStar: '98%' })).toBe('C');
  });

  it('calculates American and Thanaweya percentages using official formulas', () => {
    expect(
      calculateAmericanDiplomaPercentage({
        est1: 1080,
        est2: 960,
        gpaPoints: 720,
        subjectsCount: 8,
      })
    ).toBe(85.5);
    expect(calculateThanaweyaPercentage({ totalScore: 280, maxScore: 320 })).toBe(87.5);
  });

  it('integrates faculty fee mapping + scholarship tiers for eligibility rows', () => {
    const engineering = egyptianTuitionFees.find((fee) => fee.faculty === 'Engineering');
    expect(engineering).toBeTruthy();

    const results = calculateEligibilityForFees(
      engineering ? [engineering] : [],
      'IGCSE',
      90
    );

    expect(results).toHaveLength(1);
    expect(results[0].category).toBe('A');
    expect(results[0].discount).toBe('30%');
    expect(results[0].discountedFee).toBe(242000);
  });
});
