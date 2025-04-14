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
import { deleteBioLink } from "@/app/actions";

export default async function LinksPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch user's bio links from the database
  const { data: links, error } = await supabase
    .from("bio_links")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bio links:", error);
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
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4">
                <h3 className="text-xl font-semibold text-destructive">
                  Error loading bio links
                </h3>
                <p className="text-muted-foreground max-w-md">
                  There was an error loading your bio links. Please try again
                  later.
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  // Use empty array if links is null
  const bioLinks = links || [];

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

        {bioLinks.length === 0 ? (
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
            {bioLinks.map((link) => (
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
                          {link.views || 0}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Views
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold">
                          {link.clicks || 0}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Clicks
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold">
                          {link.views && link.clicks && link.clicks > 0
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
                      <Link href={`/${link.username}`} target="_blank">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Visit
                        </Button>
                      </Link>
                      <Link href={`/dashboard/analytics?id=${link.id}`}>
                        <Button variant="outline" size="sm">
                          <BarChart className="h-4 w-4 mr-1" />
                          Analytics
                        </Button>
                      </Link>
                      <Link href={`/dashboard/edit/${link.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <form action={deleteBioLink}>
                        <input type="hidden" name="id" value={link.id} />
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          type="submit"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
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
