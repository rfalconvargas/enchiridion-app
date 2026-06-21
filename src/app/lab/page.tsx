import type { Metadata } from "next";
import { FossilLab } from "@/components/lab/FossilLab";

export const metadata: Metadata = {
  title: "Fossil Lab",
  description:
    "A 60-second interactive investigation: why most dinosaur reconstructions are wrong, and how Enchiridion turns fossil evidence into understanding you can question.",
  alternates: { canonical: "/lab" },
};

export default function LabPage() {
  return <FossilLab />;
}
