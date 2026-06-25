import { redirect } from 'next/navigation';

export default function AdminRootPage() {
  // This automatically sends anyone who goes to /admin directly to the dashboard
  redirect('/admin/dashboard');
}