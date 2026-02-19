export interface FacultyContext {
  key: string;
  name: string;
  aliases: string[];
  fees: {
    tuition: number;
    educationalSupportServices: number;
    administrativeFees: number;
    categoryC: number;
    feeByTier: {
      C: number;
      B: number;
      A: number;
      AStar: number;
    };
  };
  minimumAdmission: {
    egyptianCertificates: number;
    internationalCertificates: number;
  };
}

export interface ScholarshipContext {
  facultyKey: string;
  facultyName: string;
  thresholds: Record<
    "igcse" | "american" | "arab" | "thanaweya",
    {
      B: number;
      A: number;
      AStar: number;
    }
  >;
  feeByTier: {
    C: number;
    B: number;
    A: number;
    AStar: number;
  };
}

export interface RequirementContext {
  curriculumId: string;
  curriculum: string;
  studentType: "Egyptian" | "International" | "Both";
  facultyGroup: string;
  faculties: string[];
  section: string;
  requirements: string[];
  notes?: string;
  generalRequirements: string[];
}

export interface ContactContext {
  department: string;
  name: string;
  title?: string;
  extension: string;
  email?: string | string[];
  externalNumber?: string;
}

export interface AdmissionsRAGContext {
  faculties: FacultyContext[];
  scholarships: ScholarshipContext[];
  requirements: RequirementContext[];
  contacts: ContactContext[];
}

export type AdmissionsIntent =
  | "fees"
  | "scholarships"
  | "requirements"
  | "contacts"
  | "general";

export interface AdmissionsAnswerResult {
  answer: string;
  confidence: number;
  intents: AdmissionsIntent[];
  matchedFaculties: string[];
  needsClarification: boolean;
  clarificationQuestion?: string;
}
