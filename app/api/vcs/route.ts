import vcsGraph from "@/lib/vcs";

export function GET(req: any, res: any) {
  return res.status(200).json({ vcsGraph });
}