"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { UserCircle, Home, Link2, BarChart, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" prefetch className="text-xl font-bold">
            LinkGenius
          </Link>
          <div className="hidden md:flex items-center space-x-1 ml-6">
            <Link
              href="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/dashboard" ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <Home className="h-4 w-4 inline mr-1" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/links"
              className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/dashboard/links" ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <Link2 className="h-4 w-4 inline mr-1" />
              My Links
            </Link>
            <Link
              href="/dashboard/analytics"
              className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/dashboard/analytics" ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <BarChart className="h-4 w-4 inline mr-1" />
              Analytics
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.refresh();
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
