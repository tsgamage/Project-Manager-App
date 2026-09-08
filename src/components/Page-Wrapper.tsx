export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
  breadCrumbComponent?: React.ComponentType;
}) {
  return <div>{children}</div>;
}
