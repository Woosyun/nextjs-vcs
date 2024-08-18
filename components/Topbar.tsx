"use client"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link"

const menuItems = [
  { label: "select folder", href: "/select-folder" },
  { label: "graph", href: "/show-graph" },
]

export default function Topbar() {
  return (
    <Menubar>
      <MenubarMenu>
        <Navigator/>
      </MenubarMenu>
    </Menubar>
  )
}

function Navigator() {
  return (
    <>
      <MenubarTrigger>Navigation</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <Link href="/">Home</Link>
        </MenubarItem>
        {menuItems.map((item, index) => (
          <>
            <MenubarSeparator />
            <MenubarItem key={index}>
              <Link href={item.href}>{item.label}</Link>
            </MenubarItem>
          </>
        ))}
      </MenubarContent>
    </>
  )
}