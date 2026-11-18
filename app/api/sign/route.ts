import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const u = new URL(req.url);
  const ns = u.searchParams.get("ns") || "git";
  const payload = u.searchParams.get("payload") || "";
  const r = await fetch("https://git-sign.v0.app/sign", {
    method: "POST",
    headers: {
      "content-type": "application/vnd.git.ssh-signature-request",
      accept: "application/vnd.git.ssh-signature",
      "x-v0-git-signing-namespace": ns,
    },
    body: payload,
  });
  const text = await r.text();
  return new Response(text, { status: r.status, headers: { "content-type": "text/plain" } });
}