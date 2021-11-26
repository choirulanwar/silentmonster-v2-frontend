import Link from 'next/link'
import {
  DashboardIcon,
  ReaderIcon,
  LayersIcon,
  GlobeIcon,
  EnvelopeOpenIcon,
  RocketIcon,
  MixIcon,
  LightningBoltIcon,
  GearIcon,
  ArchiveIcon,
  CubeIcon,
  StarIcon,
  TokensIcon,
  VercelLogoIcon,
  GitHubLogoIcon,
  BarChartIcon,
  TimerIcon
} from '@radix-ui/react-icons'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent
} from 'react-pro-sidebar'
// import './SideNav.module.scss'

const SideNav = ({ toggled, onToggle }) => {
  return (
    <aside>
      <ProSidebar breakPoint="md" toggled={toggled} onToggle={onToggle}>
        <SidebarHeader>
          <div className="uppercase overflow-ellipsis whitespace-nowrap overflow-hidden tracking-wide p-6 font-bold text-lg">
            SilentMonster
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu>
            <MenuItem icon={<DashboardIcon />}>
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </MenuItem>
            <MenuItem icon={<ReaderIcon />}>
              <Link href="/keywords">
                <a>Keywords</a>
              </Link>
            </MenuItem>
            <MenuItem icon={<LayersIcon />}>
              <Link href="/themes">
                <a>Themes</a>
              </Link>
            </MenuItem>
            <MenuItem icon={<GlobeIcon />}>
              <Link href="/sites">
                <a>Sites</a>
              </Link>
            </MenuItem>
            <MenuItem icon={<TimerIcon />}>
              <Link href="/schedules">
                <a>Schedules</a>
              </Link>
            </MenuItem>
            <SubMenu title="Templates" icon={<EnvelopeOpenIcon />}>
              <MenuItem icon={<RocketIcon />}>
                <Link href="/templates/project">
                  <a>Project</a>
                </Link>
              </MenuItem>
              <MenuItem icon={<MixIcon />}>
                <Link href="/templates/post">
                  <a>Post</a>
                </Link>
              </MenuItem>
              <MenuItem icon={<LightningBoltIcon />}>
                <Link href="/templates/ads">
                  <a>Ads</a>
                </Link>
              </MenuItem>
            </SubMenu>
            <SubMenu title="Settings" icon={<GearIcon />}>
              <MenuItem icon={<CubeIcon />}>
                <Link href="/settings/oauth">
                  <a>OAuth key</a>
                </Link>
              </MenuItem>
              <MenuItem icon={<ArchiveIcon />}>
                <Link href="/settings/webmaster">
                  <a>Webmaster</a>
                </Link>
              </MenuItem>
              <MenuItem icon={<TokensIcon />}>
                <Link href="/settings/dns">
                  <a>DNS</a>
                </Link>
              </MenuItem>
              <MenuItem icon={<VercelLogoIcon />}>
                <Link href="/settings/cloud">
                  <a>Cloud hosting</a>
                </Link>
              </MenuItem>
              <MenuItem icon={<StarIcon />}>
                <Link href="/settings/domain">
                  <a>Domain</a>
                </Link>
              </MenuItem>
              <MenuItem icon={<GitHubLogoIcon />}>
                <Link href="/settings/github">
                  <a>Github</a>
                </Link>
              </MenuItem>
            </SubMenu>
            <SubMenu title="Tools" icon={<EnvelopeOpenIcon />}>
              <MenuItem icon={<BarChartIcon />}>
                <Link href="/tools/trending-keyword">
                  <a>Trending keyword</a>
                </Link>
              </MenuItem>
              <MenuItem icon={<BarChartIcon />}>
                <Link href="/tools/keyword-suggest">
                  <a>Keyword suggest</a>
                </Link>
              </MenuItem>
            </SubMenu>
          </Menu>
          <Menu></Menu>
        </SidebarContent>
      </ProSidebar>
    </aside>
  )
}

export default SideNav
