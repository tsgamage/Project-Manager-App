import PageWrapper from "@/components/Page-Wrapper";

export default function OverviewPage() {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Overview</h1>
        <p>Welcome to the Overview page!</p>
        <h4 className="text-emerald-500">Hello Princess!</h4>
      </div>
    </PageWrapper>
  );
}
