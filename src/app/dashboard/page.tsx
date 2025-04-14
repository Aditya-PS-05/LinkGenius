import DashboardNavbar from "@/components/dashboard-navbar";
import {
  InfoIcon,
  UserCircle,
  Link2,
  BarChart,
  PlusCircle,
  ExternalLink,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Placeholder data for demo purposes
  const stats = {
    totalLinks: 2,
    totalViews: 373,
    totalClicks: 129,
    ctr: 34.6,
  };

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user.user_metadata?.full_name || user.email}
              </p>
            </div>
            <Link href="/dashboard/create">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Link
              </Button>
            </Link>
          </header>

          {/* Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    <Link2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold">{stats.totalLinks}</h3>
                  <p className="text-sm text-muted-foreground">Total Links</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-3">
                    <ExternalLink className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold">{stats.totalViews}</h3>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-3 rounded-full mb-3">
                    <BarChart className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-3xl font-bold">{stats.totalClicks}</h3>
                  <p className="text-sm text-muted-foreground">Total Clicks</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-amber-100 p-3 rounded-full mb-3">
                    <BarChart className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-3xl font-bold">{stats.ctr}%</h3>
                  <p className="text-sm text-muted-foreground">Avg. CTR</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Recent Links Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Links</h2>
              <Link
                href="/dashboard/links"
                className="text-sm text-blue-600 hover:underline"
              >
                View all
              </Link>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">My Portfolio</h3>
                      <p className="text-sm text-muted-foreground">
                        linkgenius.com/portfolio
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">245</p>
                        <p className="text-xs text-muted-foreground">Views</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">87</p>
                        <p className="text-xs text-muted-foreground">Clicks</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Music Links</h3>
                      <p className="text-sm text-muted-foreground">
                        linkgenius.com/music
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">128</p>
                        <p className="text-xs text-muted-foreground">Views</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">42</p>
                        <p className="text-xs text-muted-foreground">Clicks</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* User Profile Section */}
          <section className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <UserCircle size={48} className="text-primary" />
              <div>
                <h2 className="font-semibold text-xl">User Profile</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 overflow-hidden">
              <pre className="text-xs font-mono max-h-48 overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
