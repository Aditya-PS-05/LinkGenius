import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, ExternalLink, BarChart, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function LinksPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Placeholder data for demo purposes
  const links = [
    {
      id: "1",
      title: "My Portfolio",
      username: "portfolio",
      views: 245,
      clicks: 87,
      createdAt: "2023-05-15",
    },
    {
      id: "2",
      title: "Music Links",
      username: "music",
      views: 128,
      clicks: 42,
      createdAt: "2023-06-22",
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Bio Links</h1>
            <p className="text-muted-foreground">
              Manage all your bio links in one place
            </p>
          </div>
          <Link href="/dashboard/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Link
            </Button>
          </Link>
        </div>

        {links.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="rounded-full bg-muted p-6">
                  <ExternalLink className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No bio links yet</h3>
                <p className="text-muted-foreground max-w-md">
                  Create your first bio link to start sharing your content with
                  the world.
                </p>
                <Link href="/dashboard/create">
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Your First Link
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {links.map((link) => (
              <Card key={link.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{link.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        linkgenius.com/{link.username}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 md:gap-8">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold">
                          {link.views}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Views
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold">
                          {link.clicks}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Clicks
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold">
                          {link.clicks > 0
                            ? Math.round((link.clicks / link.views) * 100)
                            : 0}
                          %
                        </span>
                        <span className="text-xs text-muted-foreground">
                          CTR
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Visit
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart className="h-4 w-4 mr-1" />
                        Analytics
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
