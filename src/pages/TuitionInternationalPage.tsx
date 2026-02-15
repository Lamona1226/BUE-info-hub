import { PageHeader } from '@/components/PageHeader';
import { FeesModuleNav } from '@/components/FeesModuleNav';
import { TuitionModule } from '@/components/TuitionModule';
import { formatGBP } from '@/data/fees';
import { tuitionDataByStudentType, tuitionModuleCopy } from '@/data/fees-module';

export const TuitionInternationalPage = () => {
  const { title, description } = tuitionModuleCopy.headers.international;

  return (
    <div className="animate-fade-in">
      <PageHeader title={title} description={description} />
      <FeesModuleNav />
      <section className="mt-6">
        <TuitionModule rows={tuitionDataByStudentType.international} formatCurrency={formatGBP} />
      </section>
    </div>
  );
};
