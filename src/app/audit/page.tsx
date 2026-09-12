import { notFound } from "next/navigation";
import AuditSurface from "./surface";
export const metadata = {
  title: "Local portfolio QA",
  robots: { index: false, follow: false },
};
export default function Audit() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <AuditSurface />;
}
