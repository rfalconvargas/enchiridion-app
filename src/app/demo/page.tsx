import type { Metadata } from "next";
import { AppShell } from "@/components/shell/AppShell";

export const metadata: Metadata = {
  title: "Interactive 3D Demo",
  description:
    "Explore the Enchiridion learning app: orbit a real Spinosaurus reconstruction in 3D, compare a century of changing science, and grow your Knowledge Tree.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return <AppShell />;
}

