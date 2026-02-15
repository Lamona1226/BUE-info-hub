import { CreditCard, Filter } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { FeesModuleNav } from '@/components/FeesModuleNav';
import { TuitionModule } from '@/components/TuitionModule';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  egyptianTuitionFees,
  formatEGP,
  formatGBP,
  internationalTuitionFees,
  scholarshipThresholds,
} from '@/data/fees';
import { scholarshipCategoryStyles, tuitionDataByStudentType } from '@/data/fees-module';

export const FeesPage = () => {
  const [certificateType, setCertificateType] = useState<string>('');
  const [scoreInput, setScoreInput] = useState('');

  const parsePercentValue = (value: string) => {
    const match = value.match(/(\d+(?:\.\d+)?)/);
    return match ? Number(match[1]) : 0;
  };

  const findThresholdForFaculty = (faculty: string) => {
    const normalize = (value: string) => value.toLowerCase().trim();
    return scholarshipThresholds.find((threshold) =>
      threshold.faculties.some(
        (listed) =>
          normalize(listed).includes(normalize(faculty)) ||
          normalize(faculty).includes(normalize(listed))
      )
    );
  };

  const certificateKey = (type: string) => {
    switch (type) {
      case 'igcse':
        return 'igcse';
      case 'american':
        return 'american';
      case 'thanaweya':
        return 'thanwya';
      case 'other':
        return 'igcse';
      default:
        return 'igcse';
    }
  };

  const scoreValue = Number(scoreInput);
  const scoreValid = scoreInput.trim().length > 0 && !Number.isNaN(scoreValue);

  const eligibilityResults = useMemo(() => {
    if (!certificateType || !scoreValid) {
      return { egyptian: [], international: [], allBelowThreshold: false };
    }

    const key = certificateKey(certificateType);

    const computeResults = (fees: typeof egyptianTuitionFees) =>
      fees
        .map((fee) => {
          const threshold = findThresholdForFaculty(fee.faculty);
          if (!threshold) return null;

          const cert = threshold.certificates[key];
          if (!cert) return null;

          const scoreB = parsePercentValue(cert.B);
          const scoreA = parsePercentValue(cert.A);
          const scoreAStar = parsePercentValue(cert.AStar);

          let category: 'AStar' | 'A' | 'B' | 'C' = 'C';
          if (scoreValue >= scoreAStar) category = 'AStar';
          else if (scoreValue >= scoreA) category = 'A';
          else if (scoreValue >= scoreB) category = 'B';

          const discount =
            category === 'AStar'
              ? threshold.discountAStar
              : category === 'A'
                ? threshold.discountA
                : category === 'B'
                  ? threshold.discountB
                  : '0%';

          const discountedFee =
            category === 'AStar'
              ? fee.categoryAStar
              : category === 'A'
                ? fee.categoryA
                : category === 'B'
                  ? fee.categoryB
                  : fee.categoryC;

          return {
            faculty: fee.faculty,
            program: fee.program,
            category,
            discount,
            discountedFee,
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item));

    const egyptianResults = computeResults(egyptianTuitionFees);
    const internationalResults = computeResults(internationalTuitionFees);
    const allBelowThreshold =
      egyptianResults.length > 0 &&
      internationalResults.length > 0 &&
      egyptianResults.every((item) => item.category === 'C') &&
      internationalResults.every((item) => item.category === 'C');

    return {
      egyptian: egyptianResults,
      international: internationalResults,
      allBelowThreshold,
    };
  }, [certificateType, scoreValid, scoreValue]);

  const eligibilityMessage = () => {
    if (!certificateType) return 'Select a certificate type to begin.';
    if (!scoreValid) return 'Enter a valid numeric score, GPA, or percentage.';
    if (eligibilityResults.egyptian.length === 0 && eligibilityResults.international.length === 0) {
      return 'No matching thresholds were found for the selected certificate type.';
    }
    if (eligibilityResults.allBelowThreshold) {
      return 'Score is below scholarship thresholds. Base tuition (Category C) applies.';
    }
    return '';
  };

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Fees & Scholarships"
        description="Unified tuition tables with scholarships, discounts, and thresholds."
      />
      <FeesModuleNav />

      <section className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Eligibility & Scholarship Finder</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_2fr] items-end">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Certificate type</label>
            <Select value={certificateType} onValueChange={setCertificateType}>
              <SelectTrigger>
                <SelectValue placeholder="Select certificate type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="igcse">IGCSE</SelectItem>
                <SelectItem value="american">American Diploma</SelectItem>
                <SelectItem value="thanaweya">Thanaweya Amma</SelectItem>
                <SelectItem value="other">Other international certificates</SelectItem>
              </SelectContent>
            </Select>
            {certificateType === 'other' && (
              <p className="text-xs text-muted-foreground mt-2">
                Other international certificates follow IGCSE scholarship thresholds.
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Total score / GPA / percentage</label>
            <Input
              type="number"
              min="0"
              step="0.1"
              value={scoreInput}
              onChange={(event) => setScoreInput(event.target.value)}
              placeholder="Enter your score"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {eligibilityMessage()}
          </div>
        </div>

        {(eligibilityResults.egyptian.length > 0 || eligibilityResults.international.length > 0) && (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground">Egyptian Students</h3>
                <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">EGP</Badge>
              </div>
              <div className="space-y-3">
                {eligibilityResults.egyptian.map((item) => (
                  <div key={`${item.faculty}-${item.program || 'general'}`} className="rounded-xl border border-border bg-white/80 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.faculty}</p>
                        {item.program && <p className="text-xs text-muted-foreground">{item.program}</p>}
                      </div>
                      <Badge className={`text-xs ${scholarshipCategoryStyles[item.category].badge}`}>
                        Category {item.category === 'AStar' ? 'A*' : item.category}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.discount} scholarship</span>
                      <span className="font-medium text-foreground">{formatEGP(item.discountedFee)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground">International Students</h3>
                <Badge className="bg-blue-100 text-blue-700 border border-blue-200">GBP</Badge>
              </div>
              <div className="space-y-3">
                {eligibilityResults.international.map((item) => (
                  <div key={`${item.faculty}-${item.program || 'general'}`} className="rounded-xl border border-border bg-white/80 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.faculty}</p>
                        {item.program && <p className="text-xs text-muted-foreground">{item.program}</p>}
                      </div>
                      <Badge className={`text-xs ${scholarshipCategoryStyles[item.category].badge}`}>
                        Category {item.category === 'AStar' ? 'A*' : item.category}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.discount} scholarship</span>
                      <span className="font-medium text-foreground">{formatGBP(item.discountedFee)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          Tuition Tables
        </h2>
        <Tabs defaultValue="egyptian" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="egyptian">Egyptian Students</TabsTrigger>
            <TabsTrigger value="international">International Students</TabsTrigger>
          </TabsList>
          <TabsContent value="egyptian" className="mt-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Egyptian Students</h3>
                <p className="text-sm text-muted-foreground">All fees displayed in EGP.</p>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">
                Egyptian
              </Badge>
            </div>
            <TuitionModule rows={tuitionDataByStudentType.egyptian} formatCurrency={formatEGP} />
          </TabsContent>
          <TabsContent value="international" className="mt-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">International Students</h3>
                <p className="text-sm text-muted-foreground">All fees displayed in GBP.</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
                International
              </Badge>
            </div>
            <TuitionModule rows={tuitionDataByStudentType.international} formatCurrency={formatGBP} />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};
