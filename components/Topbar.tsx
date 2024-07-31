import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

export const Topbar = () => {
  const li = [
    { name: 'Documentation', shortcut: 'Ctrl+D' },
    { name: 'Blog', shortcut: 'Ctrl+B' },
    { name: 'Home', shortcut: 'Ctrl+H' }
  ];
  
  return (
    <Menubar>
      {/* <AvatarIcon /> */}
      <MenuItem triggerName="menu1" items={li} />
      <MenubarSeparator />
      
    </Menubar>
  )
}

const MenuItem = ({ triggerName, items }: {
  triggerName: string,
  items: any[]
}) => {
  return (
    <MenubarMenu>
      <MenubarTrigger>{triggerName}</MenubarTrigger>
      <MenubarContent>
        {items.map((item, index) => (
          <MenubarItem key={index}>
            {/* <a href='/'>hello world</a> */}
            {item.name} <MenubarShortcut>{item.shortcut}</MenubarShortcut>
          </MenubarItem>
        ))}
      </MenubarContent>
    </MenubarMenu>
  )
}