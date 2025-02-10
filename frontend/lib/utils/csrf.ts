import { randomBytes } from "crypto";
import { cookies } from "next/headers";

export async function generateCsrfToken() {
  const token = randomBytes(32).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set("csrf_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  return token;
}

export async function getCsrfToken() {
  const cookieStore = await cookies();
  return cookieStore.get("csrf_token")?.value;
}
