import { Message } from "@/components/shared/form-message";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "@/components/features/auth/reset-password-form";

export const metadata = {
  title: "Reset Password | Trade Tracker",
  description: "Change your account password",
};

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage(props: {
  searchParams: Promise<Message>;
}) {
  // const user = await getCurrentUser();
  const searchParams = await props.searchParams;

  return (
    <div className="flex min-h-[80vh] mx-auto items-center justify-center">
      <ResetPasswordForm message={searchParams} />
    </div>
  );
}
