import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Music, Dumbbell } from "lucide-react";

export default async function CreateBioLink() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Bio Link</h1>
          <p className="text-muted-foreground">
            Customize your page and share it with the world
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Bio Link Details</CardTitle>
                <CardDescription>
                  Enter the basic information for your bio link page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Page Title</Label>
                    <Input id="title" placeholder="My Bio Link" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="flex items-center">
                      <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 border-input text-muted-foreground">
                        linkgenius.com/
                      </span>
                      <Input
                        id="username"
                        className="rounded-l-none"
                        placeholder="yourname"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell visitors about yourself..."
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Choose a Template</CardTitle>
                <CardDescription>
                  Select a template that fits your profession
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="generic">
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="generic">Generic</TabsTrigger>
                    <TabsTrigger value="freelancer">Freelancer</TabsTrigger>
                    <TabsTrigger value="fitness">Fitness</TabsTrigger>
                    <TabsTrigger value="musician">Musician</TabsTrigger>
                  </TabsList>

                  <TabsContent value="generic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-all">
                        <div className="aspect-[9/16] bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <span className="text-sm text-muted-foreground">
                            Minimal
                          </span>
                        </div>
                        <p className="text-sm font-medium">Minimal</p>
                      </div>
                      <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-all">
                        <div className="aspect-[9/16] bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <span className="text-sm text-muted-foreground">
                            Modern
                          </span>
                        </div>
                        <p className="text-sm font-medium">Modern</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="freelancer" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-all">
                        <div className="aspect-[9/16] bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <Briefcase className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">Portfolio</p>
                      </div>
                      <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-all">
                        <div className="aspect-[9/16] bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <Briefcase className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">Services</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="fitness" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-all">
                        <div className="aspect-[9/16] bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <Dumbbell className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">Trainer</p>
                      </div>
                      <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-all">
                        <div className="aspect-[9/16] bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <Dumbbell className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">Nutrition</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="musician" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-all">
                        <div className="aspect-[9/16] bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <Music className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">Artist</p>
                      </div>
                      <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-all">
                        <div className="aspect-[9/16] bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <Music className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">Band</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  See how your bio link will look
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-2">
                  <div className="aspect-[9/16] bg-gray-100 rounded-md flex flex-col items-center justify-start p-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mb-3"></div>
                    <p className="font-medium">Your Name</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your bio goes here...
                    </p>

                    <div className="w-full space-y-2">
                      <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                      <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                      <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Create Bio Link</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
