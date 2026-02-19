import { describe, expect, it } from "vitest";
import { contactMergeAmbiguousCases, departments } from "./contacts";

const normalizeName = (name: string) => name.toLowerCase().trim().replace(/\s+/g, " ");

describe("contacts excel merge", () => {
  it("matches Rofida Ali to existing unambiguous first-name contact", () => {
    const recruitment = departments.find((department) => department.name === "Recruitment");
    const rofida = recruitment?.contacts.find((contact) => normalizeName(contact.name) === "rofida");

    expect(rofida).toBeDefined();
    expect(rofida?.email).toBe("rofida.ali@bue.edu.eg");
  });

  it("does not append a separate Rofida Ali record", () => {
    const allContacts = departments.flatMap((department) => department.contacts);
    const hasRofidaAli = allContacts.some((contact) => normalizeName(contact.name) === "rofida ali");

    expect(hasRofidaAli).toBe(false);
  });

  it("collects ambiguous first-name merge candidates for manual review", () => {
    expect(Array.isArray(contactMergeAmbiguousCases)).toBe(true);
  });

  it("removes temporary Sheet1 department after re-homing", () => {
    const hasSourceGroup = departments.some((department) => department.name === "Sheet1");
    expect(hasSourceGroup).toBe(false);
  });
});
