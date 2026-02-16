import { describe, expect, it } from "vitest";
import {
  calculateFinderEligibility,
  isFinderCertificateType,
  normalizeFinderScoreInput,
  resolveScholarshipThreshold,
  resolveTierForScore,
} from "@/services/eligibility";

describe("eligibility hardening", () => {
  it("normalizes Thanaweya raw totals deterministically", () => {
    expect(normalizeFinderScoreInput("thanaweya", 280)).toBe(87.5);
    expect(normalizeFinderScoreInput("thanaweya", 360)).toBe(87.8);
  });

  it("clamps percentage-like certificate inputs", () => {
    expect(normalizeFinderScoreInput("igcse", 140)).toBe(100);
    expect(normalizeFinderScoreInput("other", -5)).toBe(0);
    expect(normalizeFinderScoreInput("american", 250)).toBe(200);
  });

  it("classifies boundaries correctly for threshold tiers", () => {
    const threshold = resolveScholarshipThreshold("Engineering");
    expect(threshold).toBeDefined();
    if (!threshold) return;

    expect(resolveTierForScore(84.99, threshold, "igcse")).toBe("C");
    expect(resolveTierForScore(85, threshold, "igcse")).toBe("B");
    expect(resolveTierForScore(89.99, threshold, "igcse")).toBe("B");
    expect(resolveTierForScore(90, threshold, "igcse")).toBe("A");
    expect(resolveTierForScore(97.99, threshold, "igcse")).toBe("A");
    expect(resolveTierForScore(98, threshold, "igcse")).toBe("AStar");
  });

  it("accepts only supported certificate types", () => {
    expect(isFinderCertificateType("igcse")).toBe(true);
    expect(isFinderCertificateType("american")).toBe(true);
    expect(isFinderCertificateType("thanaweya")).toBe(true);
    expect(isFinderCertificateType("other")).toBe(true);
    expect(isFinderCertificateType("invalid")).toBe(false);
  });

  it("applies normalized score in finder calculations", () => {
    const result = calculateFinderEligibility("thanaweya", 280);
    expect(result.egyptian.length).toBeGreaterThan(0);
    expect(result.international.length).toBeGreaterThan(0);
    expect(result.allBelowThreshold).toBe(false);
  });
});
