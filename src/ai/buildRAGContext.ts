import { admissionRequirements } from "@/data/admission-requirements";
import { departments } from "@/data/contacts";
import {
  facultyFeeConfig2026,
  scholarshipThresholdRows2026,
} from "@/data/fees-2026";
import type {
  AdmissionsRAGContext,
  ContactContext,
  FacultyContext,
  RequirementContext,
  ScholarshipContext,
} from "./types";

const normalize = (value: string): string => value.toLowerCase().trim();

const sortByName = <T extends { name: string }>(items: T[]): T[] =>
  [...items].sort((a, b) => a.name.localeCompare(b.name));

const normalizeFaculties = (): FacultyContext[] =>
  sortByName(
    facultyFeeConfig2026.map((entry) => ({
      key: entry.key,
      name: entry.faculty,
      aliases: [...entry.aliases].sort((a, b) => a.localeCompare(b)),
      fees: {
        tuition: entry.feeBreakdown.tuitionFees,
        educationalSupportServices: entry.feeBreakdown.educationalSupportServices,
        administrativeFees: entry.feeBreakdown.administrativeFees,
        categoryC: entry.feeBreakdown.totalCategoryC,
        feeByTier: {
          C: entry.feeByTier.C,
          B: entry.feeByTier.B,
          A: entry.feeByTier.A,
          AStar: entry.feeByTier.AStar,
        },
      },
      minimumAdmission: {
        egyptianCertificates: entry.minimumAdmission.egyptianCertificates,
        internationalCertificates: entry.minimumAdmission.internationalCertificates,
      },
    }))
  );

const normalizeScholarships = (): ScholarshipContext[] => {
  const feeByFaculty = new Map(
    facultyFeeConfig2026.map((entry) => [normalize(entry.faculty), entry.feeByTier])
  );

  return [...scholarshipThresholdRows2026]
    .map((row) => ({
      facultyKey: normalize(row.faculty).replace(/\s+/g, "-"),
      facultyName: row.faculty,
      thresholds: row.thresholds,
      feeByTier: feeByFaculty.get(normalize(row.faculty)) ?? {
        C: 0,
        B: 0,
        A: 0,
        AStar: 0,
      },
    }))
    .sort((a, b) => a.facultyName.localeCompare(b.facultyName));
};

const normalizeRequirements = (): RequirementContext[] =>
  admissionRequirements
    .flatMap((curriculum) =>
      curriculum.facultyRequirements.map((facultyReq) => ({
        curriculumId: curriculum.id,
        curriculum: curriculum.curriculum,
        studentType: curriculum.studentType,
        facultyGroup: facultyReq.facultyGroup,
        faculties: [...facultyReq.faculties].sort((a, b) => a.localeCompare(b)),
        section: facultyReq.section,
        requirements: [...facultyReq.requirements],
        notes: facultyReq.notes,
        generalRequirements: [...curriculum.generalRequirements],
      }))
    )
    .sort((a, b) => {
      const curriculumCompare = a.curriculum.localeCompare(b.curriculum);
      if (curriculumCompare !== 0) return curriculumCompare;
      return a.facultyGroup.localeCompare(b.facultyGroup);
    });

const normalizeContacts = (): ContactContext[] =>
  departments
    .flatMap((department) =>
      department.contacts.map((contact) => ({
        department: department.name,
        name: contact.name,
        title: contact.title,
        extension: contact.extension,
        email: contact.email,
        externalNumber: contact.externalNumber,
      }))
    )
    .sort((a, b) => {
      const departmentCompare = a.department.localeCompare(b.department);
      if (departmentCompare !== 0) return departmentCompare;
      return a.name.localeCompare(b.name);
    });

export async function buildRAGContext(): Promise<AdmissionsRAGContext> {
  return {
    faculties: normalizeFaculties(),
    scholarships: normalizeScholarships(),
    requirements: normalizeRequirements(),
    contacts: normalizeContacts(),
  };
}
