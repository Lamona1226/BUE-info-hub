import {
  EXCEL_SOURCE_DEPARTMENT_KEY,
  inferDepartmentFromTitle,
} from "@/config/contacts-department-map";
import { excelDirectoryContacts } from "./contacts-directory-excel";
import { facultyContactsSeed } from "./faculty-contacts-seed";

// ============= Contact Directory Data =============
 export interface Contact {
   name: string;
   title?: string;
   extension: string;
   department: string;
  email?: string | string[];
  externalNumber?: string;
   role?: string;
 }

export interface ContactDirectoryEntry {
  departmentName: string;
  extension: string;
  directNumber?: string;
  notes?: string;
}
 
 export interface Department {
   name: string;
   head?: string;
   headExtension?: string;
   contacts: Contact[];
 }
 
const baseDepartments: Department[] = [
   {
     name: "Reception & President's Office",
     head: "Mr. Mohamed Lotfi",
     headExtension: "1010",
     contacts: [
       { name: "Reception C", extension: "1002", department: "Reception" },
       { name: "Aisha Abouelela", extension: "1006", department: "President's Office" },
       { name: "Engy Elnadory", extension: "1004", department: "President's Office" },
       { name: "Parry Khalil", extension: "1008", department: "President's Office" },
       { name: "Rania Boraie", extension: "1005", department: "President's Office" },
       { name: "Sahar Elatwy", extension: "2353", department: "President's Office" },
       { name: "Mr. Mohamed Farid Khamis", extension: "1055", department: "President's Office" },
       { name: "FAX", extension: "26300010-26300020", department: "President's Office", role: "Fax" },
     ],
   },
   {
     name: "Vice President's Office",
     head: "Mr. Yehia Bahei Eldin",
     headExtension: "1051",
     contacts: [
       { name: "Youssef Youssef", extension: "1301", department: "Vice President" },
       { name: "Aya Ashraf", extension: "2360", department: "Vice President" },
       { name: "Lara Ahmed", extension: "1047", department: "Vice President" },
       { name: "Hoda Hosni", extension: "1052", department: "Vice President" },
       { name: "Shaimaa Fahmy", extension: "1092", department: "Vice President" },
       { name: "Nouhan Jazzy", extension: "1332", department: "Vice President" },
       { name: "Menna Ali", extension: "1322", department: "Vice President", role: "Gams Building C" },
       { name: "Aya Samir", extension: "1056", department: "Vice President" },
       { name: "Noha Mohamed", extension: "1065", department: "Vice President" },
     ],
   },
   {
     name: "Academic Affairs",
     head: "Prof. Guy Daly",
     headExtension: "1077",
     contacts: [
       { name: "Mr. Mohamed Ismail", extension: "1041", department: "Academic Affairs", role: "Dr" },
       { name: "Mustafa Saad", extension: "1058", department: "Academic Affairs" },
       { name: "Abdal Rahman Ashour", extension: "1303", department: "Academic Affairs" },
       { name: "Menna Ali", extension: "1322", department: "Academic Affairs" },
       { name: "Hala Tag", extension: "1320", department: "Academic Affairs" },
       { name: "Nahla Adib", extension: "1042-1330", department: "Academic Affairs" },
       { name: "Mahsheed", extension: "1305", department: "Academic Affairs" },
     ],
   },
   {
     name: "Campus Management",
     head: "Mr. Mohamed Hassan",
     headExtension: "1045",
     contacts: [
       { name: "Mahmoud Samir", extension: "1404", department: "Campus" },
       { name: "Mr. Sherif Attared", extension: "1810", department: "Campus" },
       { name: "Ashraf Mohamed", extension: "1053", department: "Campus" },
       { name: "Engy Salem", extension: "1050", department: "Campus" },
     ],
   },
   {
     name: "IT Department",
     head: "Mohamed Tharwat",
     headExtension: "1351",
     contacts: [
       { name: "Salwa Sherif", extension: "2355", department: "IT" },
       { name: "Abdelhafeez", extension: "2351", department: "IT" },
       { name: "Eman Maty", extension: "2354", department: "IT" },
       { name: "Karim Ahmed", extension: "1354", department: "IT" },
       { name: "Mohamed Faied", extension: "1007", department: "IT" },
       { name: "Mohamed Salem", extension: "1353", department: "IT" },
       { name: "Emad Aboul Kheir", extension: "1370", department: "IT" },
       { name: "Basma Abed", extension: "1357", department: "IT" },
       { name: "Mostafa", extension: "1359", department: "IT", role: "Building G" },
       { name: "Mohamed Elfayed", extension: "1007", department: "IT" },
       { name: "Ebrahim Maati", extension: "1392", department: "IT" },
       { name: "Abdel Hamed", extension: "2390", department: "IT", role: "Building A" },
       { name: "Software", extension: "1626", department: "IT" },
       { name: "Mostafa", extension: "2356", department: "IT" },
       { name: "Team E-learning", extension: "1629", department: "IT" },
     ],
   },
   {
     name: "Human Resources",
     head: "Ms. Marwa Hassan",
     headExtension: "2346",
     contacts: [
       { name: "Haidy Tarek", extension: "2339", department: "HR" },
       { name: "Mohamed Nadi", extension: "1340", department: "HR" },
       { name: "Ahmed Bahnasawy", extension: "1348", department: "HR" },
       { name: "Eslam Rida", extension: "1335", department: "HR" },
       { name: "Farah Roushdy", extension: "2340", department: "HR" },
       { name: "Mohamed Akram", extension: "1345", department: "HR" },
       { name: "Doha Sobhy", extension: "1302", department: "HR" },
       { name: "Shahira Amer", extension: "2338", department: "HR" },
       { name: "Mina Saba", extension: "1342", department: "HR" },
       { name: "Tarek Yahia", extension: "1347", department: "HR" },
       { name: "Mai Emira", extension: "1346", department: "HR" },
       { name: "Ahmed Ezz Elregal", extension: "2347", department: "HR" },
       { name: "Yasmine Hussein", extension: "1339", department: "HR" },
       { name: "Salma Ismail", extension: "1341", department: "HR" },
       { name: "Mohamed Aboeldahab", extension: "2345", department: "HR" },
     ],
   },
   {
     name: "Finance",
     head: "Mr. Fath Abdel Moneim",
     headExtension: "1382",
     contacts: [
       { name: "Reham Mohamed", extension: "2398", department: "Finance", role: "Assistant" },
       { name: "Mr. Sherif Hosni", extension: "1361", department: "Finance" },
       { name: "Rana Alaa", extension: "2362", department: "Finance", role: "Assistant" },
       { name: "Mr. Hany Ali", extension: "1388", department: "Finance" },
       { name: "Alla Hegab", extension: "1386", department: "Finance" },
       { name: "Shady Abdelhady", extension: "2378", department: "Finance" },
       { name: "Christine Elius", extension: "2382", department: "Finance" },
       { name: "Mohamed Gouda", extension: "1384", department: "Finance" },
       { name: "Reem Ibrahim", extension: "1379", department: "Finance" },
       { name: "Sherif Hamza", extension: "2379", department: "Finance" },
       { name: "Omnia Essam", extension: "1021", department: "Finance" },
       { name: "Ahmed Seleem", extension: "1389", department: "Finance" },
       { name: "Ahmed Saber", extension: "1393", department: "Finance" },
       { name: "Ahmed Talaat", extension: "1396", department: "Finance" },
       { name: "Ahmed Samir", extension: "1399", department: "Finance" },
       { name: "Ibrahim Hamdy", extension: "1022", department: "Finance" },
       { name: "Mohamed Emad", extension: "1385", department: "Finance" },
       { name: "Ahmed Qurtam", extension: "1018", department: "Finance" },
       { name: "Abdel Rahman Seliman", extension: "1368", department: "Finance" },
       { name: "Ahmed Essawy", extension: "2386", department: "Finance" },
       { name: "Youssef El Sherif", extension: "2332", department: "Finance" },
       { name: "Moustafa Basuni", extension: "1380", department: "Finance" },
       { name: "Ahmed Salah", extension: "2389", department: "Finance" },
       { name: "Gamal Rashad", extension: "2326", department: "Finance", role: "Accounts Archive" },
     ],
   },
   {
     name: "Treasury",
     contacts: [
       { name: "Mohamed Hassan", extension: "1398", department: "Treasury" },
     ],
   },
   {
     name: "Security",
     head: "Mr. General Alharany",
     headExtension: "1015",
     contacts: [
       { name: "Waled Farouk", extension: "1081", department: "Security" },
     ],
   },
   {
     name: "Transportation",
     head: "Mr. Yasser Elkholy",
     headExtension: "1395",
     contacts: [
       { name: "Transportation Office", extension: "1995", department: "Transportation" },
     ],
   },
   {
     name: "Marketing & Public Relations",
     head: "Maha Salem",
     headExtension: "1102",
     contacts: [
       { name: "Marwa Gamal", extension: "1105", department: "Marketing" },
       { name: "Mohamed Samy", extension: "--", department: "Marketing", role: "Alumni" },
       { name: "Sandra Elmanesterly", extension: "1104", department: "PR" },
       { name: "Aya El Masry", extension: "1101", department: "PR" },
       { name: "Marketing Office", extension: "1097", department: "Marketing" },
       { name: "Lamia Fathy", extension: "1098", department: "Marketing" },
     ],
   },
   {
     name: "Student Activities",
     head: "Mr. Islam Swan",
     headExtension: "1815",
     contacts: [
       { name: "Ms. Safy Ayad", extension: "1813", department: "Student Activities" },
     ],
   },
   {
     name: "Library",
     head: "Mr. Tarek Mehrem",
     headExtension: "1371",
     contacts: [
       { name: "Library 1", extension: "1375", department: "Library" },
       { name: "Library 2", extension: "1376", department: "Library" },
       { name: "Elham Abeed", extension: "1377", department: "Library" },
       { name: "Mr. Mohamed Basyone", extension: "1372", department: "Library" },
     ],
   },
   {
     name: "Legal Affairs",
     head: "Mr. Ayman Abou Ghazalah",
     headExtension: "1381",
     contacts: [
       { name: "Gehad Setohy", extension: "1344", department: "Legal" },
       { name: "Islam Eldeeb", extension: "1343", department: "Legal" },
       { name: "Mohamed Wlaa", extension: "1071", department: "Legal" },
       { name: "Sara Mahmoud", extension: "2393", department: "Legal" },
     ],
   },
   {
     name: "Quality & Validation",
     head: "Alam Mahbubul",
     headExtension: "2410",
     contacts: [
       { name: "Shimaa Mahdy", extension: "2307", department: "Quality" },
       { name: "Ahmed", extension: "2304", department: "Quality" },
       { name: "Nour", extension: "2305", department: "Quality" },
       { name: "SRS 1", extension: "2306", department: "Quality" },
       { name: "SRS 2", extension: "1304", department: "Quality" },
     ],
   },
   {
     name: "Student Affairs",
     head: "Mr. Talaat Bondok",
     headExtension: "1308",
     contacts: [
       { name: "Mr. Mohamed Abdullah Rageb", extension: "1309", department: "Student Affairs", role: "Assistant Head" },
       { name: "Amer Araby", extension: "1328", department: "Student Affairs" },
       { name: "Amr El Tamy", extension: "1319", department: "Student Affairs" },
       { name: "Hussein Fathi", extension: "1338", department: "Student Affairs" },
       { name: "Ahmed Ibrahim", extension: "1316", department: "Student Affairs" },
       { name: "Tarek Shahen", extension: "1306", department: "Student Affairs" },
       { name: "Mohamed Badr", extension: "1311", department: "Student Affairs" },
       { name: "Admission 1", extension: "2321", department: "Student Affairs" },
       { name: "Admission 3", extension: "2328", department: "Student Affairs" },
       { name: "Mohamed Hassan", extension: "1025", department: "Student Affairs" },
       { name: "Emad Mohsen", extension: "1317", department: "Student Affairs" },
       { name: "Mahmoud Abbas", extension: "2316", department: "Student Affairs" },
       { name: "Gamal Mohammed", extension: "2316", department: "Student Affairs" },
       { name: "Somia Mohammed", extension: "1057", department: "Student Affairs" },
     ],
   },
   {
     name: "Recruitment",
     head: "Mr. Richard Holness",
     headExtension: "1333",
     contacts: [
       { name: "Shady Nady", extension: "1326", department: "Recruitment" },
       { name: "Aya Kasass", extension: "1061", department: "Recruitment" },
       { name: "Ahmed", extension: "1066", department: "Recruitment" },
       { name: "Rofida", extension: "1062", department: "Recruitment" },
       { name: "Laila", extension: "1074", department: "Recruitment" },
     ],
   },
   {
     name: "Engineering Department",
     contacts: [
       { name: "Samir Mehanna", extension: "2395", department: "Engineering" },
       { name: "Reda Shaaban", extension: "1387", department: "Engineering" },
       { name: "Alia Zaher", extension: "1223128061", department: "Engineering" },
     ],
   },
   {
     name: "Warehouse Management",
     head: "Mr. Yahia Zakria (Alabsi)",
     headExtension: "1046",
     contacts: [
       { name: "Adel Fathy", extension: "2367", department: "Warehouse" },
       { name: "Ali Rada", extension: "2365", department: "Warehouse" },
       { name: "Ahmed Kamaleldin", extension: "", department: "Warehouse" },
     ],
   },
   {
     name: "Purchases",
     head: "Mr. Osama Salama",
     headExtension: "2396",
     contacts: [
       { name: "Ahmed Swan", extension: "2388", department: "Purchases" },
       { name: "Youssif A. Elesh", extension: "1383", department: "Purchases" },
       { name: "Ibrahim Elsamkary", extension: "2331", department: "Purchases" },
       { name: "Mahmoud Konswa", extension: "1369", department: "Purchases" },
       { name: "Gamal Farouk", extension: "2383", department: "Purchases" },
     ],
   },
   {
     name: "Operator Office",
     contacts: [
       { name: "Amira Sherif", extension: "1001", department: "Operator" },
       { name: "Maha Fathy", extension: "1000", department: "Operator" },
     ],
   },
   {
     name: "Medical Clinic",
     contacts: [
       { name: "Dr. Dalia", extension: "1912", department: "Clinic", role: "Building G" },
       { name: "Dr. Wesam", extension: "1911", department: "Clinic", role: "Building A" },
       { name: "Dr. Tarek", extension: "1880", department: "Clinic" },
     ],
   },
   {
     name: "Postgraduate Studies",
     head: "Gada Gonim",
     headExtension: "1443",
     contacts: [
       { name: "Sherehan Sherif", extension: "1131", department: "Postgraduate" },
     ],
   },
   {
     name: "Mail Services",
     contacts: [
       { name: "Ayman Bahnswy", extension: "2061", department: "Mail" },
     ],
   },
   {
     name: "Dormitories",
     head: "Islam Bekheet",
     headExtension: "1850",
     contacts: [],
   },
];

const normalizeContactKey = (contact: Pick<Contact, "name" | "extension">): string =>
  `${contact.name.trim().toLowerCase()}::${contact.extension.trim().toLowerCase()}`;

const dedupeContacts = (contacts: Contact[]): Contact[] => {
  const seen = new Set<string>();
  return contacts.filter((contact) => {
    const key = normalizeContactKey(contact);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

const normalizeNameForComparison = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[./,\\-]/g, " ")
    .replace(/\b(mr|mrs|ms|dr|prof|d)\b/g, " ")
    .trim()
    .replace(/\s+/g, " ");

const normalizeCompactNameForComparison = (name: string): string =>
  normalizeNameForComparison(name).replace(/\s+/g, "");

const getFirstNameToken = (name: string): string => normalizeNameForComparison(name).split(" ")[0] ?? "";

const normalizeEmailValue = (email?: string | string[]): string | string[] | undefined => {
  if (!email) {
    return undefined;
  }

  const normalized = (Array.isArray(email) ? email : [email])
    .map((value) => value.trim())
    .filter(Boolean);

  if (normalized.length === 0) {
    return undefined;
  }

  return normalized.length === 1 ? normalized[0] : normalized;
};

const mergeEmailValues = (
  existing?: string | string[],
  incoming?: string | string[]
): string | string[] | undefined => {
  const currentValues = existing ? (Array.isArray(existing) ? existing : [existing]) : [];
  const incomingValues = incoming ? (Array.isArray(incoming) ? incoming : [incoming]) : [];
  const unique = Array.from(new Set([...currentValues, ...incomingValues].map((value) => value.trim()).filter(Boolean)));

  if (unique.length === 0) {
    return undefined;
  }

  return unique.length === 1 ? unique[0] : unique;
};

interface ContactRef {
  departmentIdx: number;
  contactIdx: number;
}

export interface ContactMergeAmbiguousCase {
  incomingName: string;
  incomingDepartment: string;
  firstName: string;
  candidateDepartments: string[];
  reason: "duplicate_full_name" | "ambiguous_first_name" | "unmapped_title";
  resolution: "manual_review" | "mapped_by_title";
}

const mergeDepartments = (source: Department[]): Department[] => {
  const merged = new Map<string, Department>();

  source.forEach((department) => {
    const existing = merged.get(department.name);

    if (!existing) {
      merged.set(department.name, {
        ...department,
        contacts: dedupeContacts([...department.contacts]),
      });
      return;
    }

    existing.contacts = dedupeContacts([...existing.contacts, ...department.contacts]);
    if (!existing.head && department.head) {
      existing.head = department.head;
    }
    if (!existing.headExtension && department.headExtension) {
      existing.headExtension = department.headExtension;
    }
  });

  return Array.from(merged.values());
};

const mergeContactsFromExcel = (
  source: Department[]
): { departments: Department[]; ambiguousCases: ContactMergeAmbiguousCase[] } => {
  const merged = source.map((department) => ({
    ...department,
    contacts: department.contacts.map((contact) => ({ ...contact })),
  }));

  const departmentIndex = new Map<string, number>();
  const contactByNormalizedName = new Map<string, ContactRef[]>();
  const contactByFirstName = new Map<string, ContactRef[]>();
  const ambiguousCases: ContactMergeAmbiguousCase[] = [];

  const registerContactRef = (name: string, ref: ContactRef): void => {
    const normalizedName = normalizeNameForComparison(name);
    if (normalizedName) {
      const refsByName = contactByNormalizedName.get(normalizedName) ?? [];
      refsByName.push(ref);
      contactByNormalizedName.set(normalizedName, refsByName);
    }

    const firstName = getFirstNameToken(name);
    if (firstName) {
      const refsByFirstName = contactByFirstName.get(firstName) ?? [];
      refsByFirstName.push(ref);
      contactByFirstName.set(firstName, refsByFirstName);
    }
  };

  merged.forEach((department, departmentIdx) => {
    departmentIndex.set(department.name, departmentIdx);
    department.contacts.forEach((contact, contactIdx) => {
      registerContactRef(contact.name, { departmentIdx, contactIdx });
    });
  });

  const ensureDepartment = (name: string): number => {
    const existingIdx = departmentIndex.get(name);
    if (existingIdx !== undefined) {
      return existingIdx;
    }

    const createdIdx = merged.length;
    merged.push({
      name,
      contacts: [],
    });
    departmentIndex.set(name, createdIdx);
    return createdIdx;
  };

  const sourceDepartmentIdx = ensureDepartment(EXCEL_SOURCE_DEPARTMENT_KEY);

  // Stage imported entries into source sheet department first.
  excelDirectoryContacts.forEach((excelContact) => {
    const normalizedEmail = normalizeEmailValue(excelContact.email);
    const stagedContact: Contact = {
      name: excelContact.name,
      title: excelContact.title,
      department: EXCEL_SOURCE_DEPARTMENT_KEY,
      extension: "",
      email: normalizedEmail,
      externalNumber: excelContact.externalNumber,
    };
    merged[sourceDepartmentIdx].contacts.push(stagedContact);
  });

  const allContactRefsExcludingSource = (): ContactRef[] => {
    const refs: ContactRef[] = [];
    merged.forEach((department, departmentIdx) => {
      if (departmentIdx === sourceDepartmentIdx) {
        return;
      }

      department.contacts.forEach((_, contactIdx) => {
        refs.push({ departmentIdx, contactIdx });
      });
    });
    return refs;
  };

  const findCandidatesByName = (incomingName: string): { full: ContactRef[]; first: ContactRef[] } => {
    const normalizedName = normalizeNameForComparison(incomingName);
    const compactName = normalizeCompactNameForComparison(incomingName);
    const firstName = getFirstNameToken(incomingName);
    const refs = allContactRefsExcludingSource();

    const full = refs.filter((ref) => {
      const current = merged[ref.departmentIdx].contacts[ref.contactIdx];
      const candidateNormalized = normalizeNameForComparison(current.name);
      const candidateCompact = normalizeCompactNameForComparison(current.name);
      return candidateNormalized === normalizedName || candidateCompact === compactName;
    });
    const first = refs.filter((ref) => {
      const current = merged[ref.departmentIdx].contacts[ref.contactIdx];
      return getFirstNameToken(current.name) === firstName;
    });

    return { full, first };
  };

  const upsertContactData = (targetRef: ContactRef, incoming: Contact): void => {
    const existing = merged[targetRef.departmentIdx].contacts[targetRef.contactIdx];
    existing.email = mergeEmailValues(existing.email, normalizeEmailValue(incoming.email));
    if (incoming.externalNumber) {
      existing.externalNumber = incoming.externalNumber;
    }
  };

  const appendToDepartment = (departmentName: string, contact: Contact): void => {
    const targetDepartmentIdx = ensureDepartment(departmentName);
    merged[targetDepartmentIdx].contacts.push({
      ...contact,
      department: departmentName,
    });
  };

  const stagedContacts = [...merged[sourceDepartmentIdx].contacts];
  merged[sourceDepartmentIdx].contacts = [];

  stagedContacts.forEach((stagedContact) => {
    const { full, first } = findCandidatesByName(stagedContact.name);

    if (full.length === 1) {
      upsertContactData(full[0], stagedContact);
      return;
    }

    if (full.length > 1) {
      ambiguousCases.push({
        incomingName: stagedContact.name,
        incomingDepartment: EXCEL_SOURCE_DEPARTMENT_KEY,
        firstName: getFirstNameToken(stagedContact.name),
        candidateDepartments: Array.from(
          new Set(full.map((ref) => merged[ref.departmentIdx].name))
        ),
        reason: "duplicate_full_name",
        resolution: "manual_review",
      });

      const mappedDepartment = inferDepartmentFromTitle(stagedContact.title, stagedContact.name);
      if (mappedDepartment && departmentIndex.has(mappedDepartment)) {
        appendToDepartment(mappedDepartment, stagedContact);
      }
      return;
    }

    if (first.length === 1) {
      upsertContactData(first[0], stagedContact);
      return;
    }

    if (first.length > 1) {
      ambiguousCases.push({
        incomingName: stagedContact.name,
        incomingDepartment: EXCEL_SOURCE_DEPARTMENT_KEY,
        firstName: getFirstNameToken(stagedContact.name),
        candidateDepartments: Array.from(
          new Set(first.map((ref) => merged[ref.departmentIdx].name))
        ),
        reason: "ambiguous_first_name",
        resolution: "manual_review",
      });
    }

    const mappedDepartment = inferDepartmentFromTitle(stagedContact.title, stagedContact.name);
    if (mappedDepartment && departmentIndex.has(mappedDepartment)) {
      appendToDepartment(mappedDepartment, stagedContact);
      if (first.length > 1 || full.length > 1) {
        const lastAmbiguous = ambiguousCases[ambiguousCases.length - 1];
        if (lastAmbiguous?.incomingName === stagedContact.name) {
          lastAmbiguous.resolution = "mapped_by_title";
        }
      }
      return;
    }

    ambiguousCases.push({
      incomingName: stagedContact.name,
      incomingDepartment: EXCEL_SOURCE_DEPARTMENT_KEY,
      firstName: getFirstNameToken(stagedContact.name),
      candidateDepartments: [],
      reason: "unmapped_title",
      resolution: "manual_review",
    });
  });

  // Remove temporary source department after re-homing.
  const cleanedDepartments = merged.filter((department) => department.name !== EXCEL_SOURCE_DEPARTMENT_KEY);

  return { departments: cleanedDepartments, ambiguousCases };
};

const mergedContactResult = mergeContactsFromExcel(
  mergeDepartments([...baseDepartments, ...facultyContactsSeed])
);

export const departments: Department[] = mergedContactResult.departments;
export const contactMergeAmbiguousCases: ContactMergeAmbiguousCase[] = mergedContactResult.ambiguousCases;

if (contactMergeAmbiguousCases.length > 0) {
  console.warn("[contacts] Ambiguous Excel merges require manual review:", contactMergeAmbiguousCases);
}
 
 // Flatten all contacts for search
 export const getAllContacts = (): (Contact & { departmentName: string })[] => {
   const allContacts: (Contact & { departmentName: string })[] = [];
   
   departments.forEach(dept => {
     // Add department head
     if (dept.head && dept.headExtension) {
       allContacts.push({
         name: dept.head,
         extension: dept.headExtension,
         department: dept.name,
         departmentName: dept.name,
         role: 'Head',
       });
     }
     // Add all contacts
     dept.contacts.forEach(contact => {
       allContacts.push({
         ...contact,
         departmentName: dept.name,
       });
     });
   });
   
   return allContacts;
 };
 
 export const searchContacts = (query: string): (Contact & { departmentName: string })[] => {
   const lowerQuery = query.toLowerCase();
   return getAllContacts().filter(c => 
     c.name.toLowerCase().includes(lowerQuery) ||
     c.extension.includes(query) ||
     c.departmentName.toLowerCase().includes(lowerQuery) ||
    (c.title && c.title.toLowerCase().includes(lowerQuery)) ||
    (c.email &&
      (Array.isArray(c.email)
        ? c.email.some((email) => email.toLowerCase().includes(lowerQuery))
        : c.email.toLowerCase().includes(lowerQuery))) ||
    (c.externalNumber && c.externalNumber.toLowerCase().includes(lowerQuery)) ||
     (c.role && c.role.toLowerCase().includes(lowerQuery))
   );
 };

export const contactDirectoryEntries: ContactDirectoryEntry[] = getAllContacts().map((contact) => ({
  departmentName: contact.departmentName,
  extension: contact.extension,
  directNumber: contact.extension.includes('-') ? contact.extension : undefined,
  notes: contact.title ?? contact.role,
}));

export const contactDirectoryDepartments = Array.from(
  new Set(contactDirectoryEntries.map((entry) => entry.departmentName))
).sort((a, b) => a.localeCompare(b));