import { Link } from 'react-router-dom';
import {
  Settings,
  LayoutDashboard,
  UserRound,
  Blocks,
  Book,
  ChevronUp,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { Separator } from '../ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { useUser } from '@/features/auth/api/get-user';

import { paths } from '@/config/paths';
import { useLogout } from '@/features/auth/api/logout';

const links = [
  {
    title: 'داشبورد',
    url: paths.writer_panel.dashboard.getHref(),
    icon: LayoutDashboard,
  },
  {
    title: 'شاعران',
    url: '#',
    icon: UserRound,
  },
  {
    title: 'شعر ها',
    url: '#',
    icon: Book,
  },
  {
    title: 'دسته بندی ها',
    url: '#',
    icon: Blocks,
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
    <Sidebar collapsible="offcanvas" side="right" variant="floating">
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
          {links.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link to={item.url}>
                  <item.icon strokeWidth={1.4} />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
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
