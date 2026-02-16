import {
  egyptianTuitionFees,
  internationalTuitionFees,
  type EgyptianTuitionFee,
  type InternationalTuitionFee,
} from "@/data/fees";
import type { ScholarshipTier } from "./scholarshipTierMapping";

export type FinderStudentType = "egyptian" | "international";
export type TuitionFeeRow = EgyptianTuitionFee | InternationalTuitionFee;

const normalize = (value: string): string => value.toLowerCase().trim();

const getTuitionRowsForStudentType = (studentType: FinderStudentType): TuitionFeeRow[] =>
  studentType === "egyptian" ? egyptianTuitionFees : internationalTuitionFees;

export const resolveDiscountedFeeByTier = (
  fee: TuitionFeeRow,
  tier: ScholarshipTier
): number => {
  if (tier === "AStar") return fee.categoryAStar;
  if (tier === "A") return fee.categoryA;
  if (tier === "B") return fee.categoryB;
  return fee.categoryC;
};

export const resolveFacultyFeeRow = (
  studentType: FinderStudentType,
  faculty: string,
  program?: string
): TuitionFeeRow | undefined => {
  const rows = getTuitionRowsForStudentType(studentType);
  return rows.find((row) => {
    const facultyMatch =
      normalize(row.faculty).includes(normalize(faculty)) ||
      normalize(faculty).includes(normalize(row.faculty));
    const programMatch =
      !program ||
      !row.program ||
      normalize(row.program) === normalize(program);
    return facultyMatch && programMatch;
  });
};

export const getTuitionRowsByStudentType = (
  studentType: FinderStudentType
): TuitionFeeRow[] => getTuitionRowsForStudentType(studentType);
