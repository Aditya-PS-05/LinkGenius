import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import DashboardNavbar from "@/components/dashboard-navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  LineChart,
  PieChart,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export default async function AnalyticsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Placeholder data for demo purposes
  const stats = {
    totalViews: 373,
    viewsChange: 12.5,
    totalClicks: 129,
    clicksChange: 8.3,
    ctr: 34.6,
    ctrChange: -2.1,
  };

  return (
    <>
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Track the performance of your bio links
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-3xl font-bold">{stats.totalViews}</div>
                <div
                  className={`flex items-center ${stats.viewsChange >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {stats.viewsChange >= 0 ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{Math.abs(stats.viewsChange)}%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                vs. previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-3xl font-bold">{stats.totalClicks}</div>
                <div
                  className={`flex items-center ${stats.clicksChange >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {stats.clicksChange >= 0 ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{Math.abs(stats.clicksChange)}%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                vs. previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Click-Through Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-3xl font-bold">{stats.ctr}%</div>
                <div
                  className={`flex items-center ${stats.ctrChange >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {stats.ctrChange >= 0 ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{Math.abs(stats.ctrChange)}%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                vs. previous period
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Views Over Time</CardTitle>
              <CardDescription>
                Daily page views for the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Chart visualization will appear here
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Premium feature - Upgrade to view detailed analytics
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Links</CardTitle>
              <CardDescription>
                Click distribution across your links
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Chart visualization will appear here
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Premium feature - Upgrade to view detailed analytics
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>
              Where your visitors are coming from
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center">
              <div className="text-center">
                <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Chart visualization will appear here
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Premium feature - Upgrade to view detailed analytics
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
