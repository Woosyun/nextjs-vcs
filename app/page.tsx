import Link from "next/link";

export default function Page() {
  return (
    <>
      <input type="file" webkitdirectory="" />
      <p>
        <Link href='/edit'>edit</Link>
      </p>
      <p>
        <Link href='/select-folder'>select-folder</Link>
      </p>
      <p>
        <Link href='/show-graph'>show-graph</Link>
      </p>
      </>
  )
}