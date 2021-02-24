// public route components
import Recover from '../screens/recover';
import Login from '../screens/login';
import Register from '../screens/register';

// private route components
import Dashboard from '../screens/dashboard';
import Settings from '../screens/settings';
import Reports from '../screens/reports';
import Projects from '../screens/projects';
import SingleProject from '../screens/single_project';
import ReportBug from '../screens/report_bug';
import Payments from "../screens/payments";
import Contact from "../screens/contact";
import UserInfo from "../screens/user_info";

export const PublicRoutes = [
  { key: 1, name: 'Login', path: '/login', component: Login },
  { key: 2, name: 'Regiser', path: '/register', component: Register },
  { key: 3, name: 'Recover', path: '/recover', component: Recover },
];
const dashboard = `/dashboard`;

export const PrivateRoutes = [
  { key: 1, isMenuItem: false, name: 'Dashboard', path: dashboard, component: Dashboard },
  { key: 2, isMenuItem: true, name: 'Projects', path: `${dashboard}/projects`, component: Projects },
  { key: 3, isMenuItem: true, name: 'Reports', path: `${dashboard}/reports`, component: Reports },
  { key: 4, isMenuItem: true, name: 'Settings', path: `${dashboard}/settings`, component: Settings },
  { key: 5, isMenuItem: false, name: 'Single Project', path: `${dashboard}/projects/:id`, component: SingleProject },
  { key: 6, isMenuItem: false, name: 'Report Bug', path: `${dashboard}/report_bug/:app_id/cycle/:cycle_id`, component: ReportBug },
  { key: 7, isMenuItem: true, name: 'Payment', path: `${dashboard}/payments`, component: Payments },
  { key: 8, isMenuItem: true, name: "Contact Us", path: `${dashboard}/contact`, component: Contact },
  { key: 9, isMenuItem: false, name: "User info", path: `${dashboard}/user_info`, component: UserInfo },
];
