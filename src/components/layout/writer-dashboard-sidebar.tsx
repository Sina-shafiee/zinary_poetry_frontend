import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Settings,
  LayoutDashboard,
  UserRound,
  Blocks,
  Book,
  ChevronUp,
  List,
  ListPlus,
  Plus,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '../ui/sidebar';
import { Separator } from '../ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

import { useUser } from '@/features/auth/api/get-user';
import { useLogout } from '@/features/auth/api/logout';

import { paths } from '@/config/paths';

const links = [
  {
    title: 'داشبورد',
    url: paths.writer_panel.dashboard.getHref(),
    icon: LayoutDashboard,
  },
  {
    title: 'شاعران',
    url: '/panel/poets',
    icon: UserRound,
    children: [
      {
        title: 'لیست شاعران',
        url: paths.writer_panel.poets.getHref(),
        icon: List,
      },
      {
        title: 'افزودن شاعر ',
        url: '#',
        icon: ListPlus,
      },
    ],
  },
  {
    title: 'شعر ها',
    url: '#',
    icon: Book,
    children: [
      {
        title: 'لیست شعر ها',
        url: '#',
        icon: List,
      },
      {
        title: 'افزودن شعر ',
        url: '#',
        icon: ListPlus,
      },
    ],
  },
  {
    title: 'دسته بندی ها',
    url: '#',
    icon: Blocks,
    children: [
      {
        title: 'لیست دسته بندی ها',
        url: '#',
        icon: List,
      },
      {
        title: 'افزودن دسته بندی ',
        url: '#',
        icon: ListPlus,
      },
    ],
  },
  {
    title: 'تنظیمات',
    url: '#',
    icon: Settings,
  },
];
const WriterDashboardSidebar = () => {
  const user = useUser({});
  const logout = useLogout({});

  return (
    <Sidebar
      collapsible="offcanvas"
      side="right"
      variant="floating"
      className="mr-[var(--removed-body-scroll-bar-size)]"
    >
      <SidebarHeader>
        <div className="flex items-center mt-2">
          <div className="size-8 ms-2">
            <img
              className="size-8"
              src="https://zinary.net/logo.png"
              alt="logo"
            />
          </div>
          <h2 className="px-2 font-semibold">پنل نویسندگان</h2>
        </div>
      </SidebarHeader>
      <Separator className="mt-2 mx-2 w-[calc(100%-1rem)]" />
      <SidebarContent>
        <SidebarMenu className="pt-1">
          {links.map((item, index) => {
            if (item.children) {
              return (
                <React.Fragment key={item.title}>
                  <Collapsible
                    {...(index === 1 ? { defaultOpen: true } : {})}
                    className="group/collapsible p-0"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="flex justify-between items-center">
                          <p className="flex gap-2 items-center">
                            <item.icon
                              className="size-4 shrink-0"
                              strokeWidth={1.4}
                            />
                            <span>{item.title}</span>
                          </p>
                          <Plus className="size-3" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map(child => (
                            <SidebarMenuSubItem key={child.title}>
                              <SidebarMenuButton asChild>
                                <Link to={child.url}>
                                  <child.icon strokeWidth={1.4} />
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                </React.Fragment>
              );
            }
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
                    <item.icon strokeWidth={1.4} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div>{user.data!.data.email}</div>
                  <ChevronUp className="ms-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] bg-card text-card-foreground border border-input shadow-sm"
              >
                <DropdownMenuItem
                  className="focus:bg-background focus:text-foreground cursor-pointer"
                  asChild
                >
                  <SidebarMenuButton
                    onClick={() => {
                      logout.mutate(undefined, {});
                    }}
                  >
                    <span>خروج از پنل</span>
                  </SidebarMenuButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default WriterDashboardSidebar;
