import { PageHeader } from '@/components/PageHeader';
import { FeesModuleNav } from '@/components/FeesModuleNav';
import { TuitionModule } from '@/components/TuitionModule';
import { formatEGP } from '@/data/fees';
import { tuitionDataByStudentType, tuitionModuleCopy } from '@/data/fees-module';

export const TuitionEgyptianPage = () => {
  const { title, description } = tuitionModuleCopy.headers.egyptian;

  return (
    <div className="animate-fade-in">
      <PageHeader title={title} description={description} />
      <FeesModuleNav />
      <section className="mt-6">
        <TuitionModule rows={tuitionDataByStudentType.egyptian} formatCurrency={formatEGP} />
      </section>
    </div>
  );
};
