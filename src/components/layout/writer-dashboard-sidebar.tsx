import {
  Settings,
  LayoutDashboard,
  UserRound,
  Blocks,
  Book,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Link } from 'react-router-dom';
import { paths } from '@/config/paths';

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
  return (
    <Sidebar side="right" variant="floating">
      <SidebarHeader>
        <h2 className="px-2 font-semibold">پنل نویسندگان</h2>
      </SidebarHeader>
      <Separator className="mt-2 mx-2 w-[calc(100%-1rem)]" />
      <SidebarContent>
        <SidebarMenu className="pt-1">
          {links.map(item => (
            <SidebarMenuItem className="mt-1" key={item.title}>
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
    </Sidebar>
  );
};

export default WriterDashboardSidebar;
