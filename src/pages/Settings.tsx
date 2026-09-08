import PageWrapper from "@/components/Page-Wrapper";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/shadcn/breadcrumb";

const BreadCrumbComponent = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#">Project Manager</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default function SettingsPage() {
  return (
    <PageWrapper breadCrumbComponent={BreadCrumbComponent}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p>Welcome to the Settings page!</p>
      </div>
    </PageWrapper>
  );
}
