import { dummyScans } from '@/lib/dummy-data';
import { notFound } from 'next/navigation';
import ReportView from '../../../components/reports/report-view';

export default function ReportPage({ params }: { params: { reportId: string } }) {
  const report = dummyScans.find((scan) => scan.id === params.reportId);

  if (!report) {
    notFound();
  }

  return <ReportView report={report} />;
}

export function generateStaticParams() {
  return dummyScans.map((scan) => ({
    reportId: scan.id,
  }));
}
