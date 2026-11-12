import { redirect } from "next/navigation";

/** Enquiry release: Bag has no checkout. Closet holds saved pieces. */
export default function BagPage() {
  redirect("/closet");
}
