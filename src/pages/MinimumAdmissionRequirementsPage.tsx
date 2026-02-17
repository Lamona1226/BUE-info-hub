import { PageHeader } from '@/components/PageHeader';
import { RequirementsModuleNav } from '@/components/RequirementsModuleNav';
import {
  certificateTypesForMinimumAdmission,
  facultyFeeConfig2026,
} from '@/data/fees-2026';

export const MinimumAdmissionRequirementsPage = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Minimum Admission Requirements"
        description="Minimum required percentages grouped by certificate type."
      />
      <RequirementsModuleNav />

      <section className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-1">Egyptian Certificates</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {certificateTypesForMinimumAdmission.egyptianCertificates.join(' - ')}
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-semibold">Faculty</th>
                  <th className="p-3 text-left font-semibold">Minimum %</th>
                </tr>
              </thead>
              <tbody>
                {facultyFeeConfig2026.map((entry) => (
                  <tr key={`egyptian-${entry.key}`} className="border-t border-border">
                    <td className="p-3 text-foreground">{entry.faculty}</td>
                    <td className="p-3 text-foreground">{entry.minimumAdmission.egyptianCertificates}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-1">Arab / IGCSE / American Diploma</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {certificateTypesForMinimumAdmission.internationalCertificates.join(' - ')}
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-semibold">Faculty</th>
                  <th className="p-3 text-left font-semibold">Minimum %</th>
                </tr>
              </thead>
              <tbody>
                {facultyFeeConfig2026.map((entry) => (
                  <tr key={`international-${entry.key}`} className="border-t border-border">
                    <td className="p-3 text-foreground">{entry.faculty}</td>
                    <td className="p-3 text-foreground">{entry.minimumAdmission.internationalCertificates}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
