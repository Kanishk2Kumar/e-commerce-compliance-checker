import { ScanHistoryTable } from "@/components/official-UI/data-table";
import NewScan from "@/components/official-UI/newScan";
import { dummyScans } from '@/lib/dummy-data';

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className=" p-7 flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <NewScan/>
            <section className=" space-y-8">
              <ScanHistoryTable initialScans={dummyScans} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
