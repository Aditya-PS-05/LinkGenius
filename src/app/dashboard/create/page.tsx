"use client";

import { redirect, useRouter } from "next/navigation";
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
import { createBioLink } from "@/app/actions";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function CreateBioLink() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    bio: "",
    template: "minimal",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleTemplateSelect = (template: string) => {
    setFormData((prev) => ({
      ...prev,
      template,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("username", formData.username);
      formDataObj.append("bio", formData.bio);
      formDataObj.append("template", formData.template);

      const result = await createBioLink(formDataObj);

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Bio link created successfully!",
        });
        router.push("/dashboard/links");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="title">Page Title</Label>
                    <Input
                      id="title"
                      placeholder="My Bio Link"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
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
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell visitors about yourself..."
                      value={formData.bio}
                      onChange={handleChange}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Bio Link"}
                  </Button>
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
                <Tabs
                  defaultValue="generic"
                  onValueChange={(value) => {
                    // When tab changes, we'll update the template based on the first option in that category
                    const templateMap: Record<string, string> = {
                      generic: "minimal",
                      freelancer: "portfolio",
                      fitness: "trainer",
                      musician: "artist",
                    };
                    handleTemplateSelect(templateMap[value]);
                  }}
                >
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="generic">Generic</TabsTrigger>
                    <TabsTrigger value="freelancer">Freelancer</TabsTrigger>
                    <TabsTrigger value="fitness">Fitness</TabsTrigger>
                    <TabsTrigger value="musician">Musician</TabsTrigger>
                  </TabsList>

                  <TabsContent value="generic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`border rounded-lg p-4 hover:border-primary cursor-pointer transition-all ${formData.template === "minimal" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleTemplateSelect("minimal")}
                      >
                        <div className="aspect-[9/16] bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <span className="text-sm text-muted-foreground">
                            Minimal
                          </span>
                        </div>
                        <p className="text-sm font-medium">Minimal</p>
                      </div>
                      <div
                        className={`border rounded-lg p-4 hover:border-primary cursor-pointer transition-all ${formData.template === "modern" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleTemplateSelect("modern")}
                      >
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
                      <div
                        className={`border rounded-lg p-4 hover:border-primary cursor-pointer transition-all ${formData.template === "portfolio" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleTemplateSelect("portfolio")}
                      >
                        <div className="aspect-[9/16] bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <Briefcase className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">Portfolio</p>
                      </div>
                      <div
                        className={`border rounded-lg p-4 hover:border-primary cursor-pointer transition-all ${formData.template === "services" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleTemplateSelect("services")}
                      >
                        <div className="aspect-[9/16] bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <Briefcase className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">Services</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="fitness" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`border rounded-lg p-4 hover:border-primary cursor-pointer transition-all ${formData.template === "trainer" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleTemplateSelect("trainer")}
                      >
                        <div className="aspect-[9/16] bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <Dumbbell className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">Trainer</p>
                      </div>
                      <div
                        className={`border rounded-lg p-4 hover:border-primary cursor-pointer transition-all ${formData.template === "nutrition" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleTemplateSelect("nutrition")}
                      >
                        <div className="aspect-[9/16] bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <Dumbbell className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">Nutrition</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="musician" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`border rounded-lg p-4 hover:border-primary cursor-pointer transition-all ${formData.template === "artist" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleTemplateSelect("artist")}
                      >
                        <div className="aspect-[9/16] bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                          <Music className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">Artist</p>
                      </div>
                      <div
                        className={`border rounded-lg p-4 hover:border-primary cursor-pointer transition-all ${formData.template === "band" ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleTemplateSelect("band")}
                      >
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
                    <p className="font-medium">
                      {formData.title || "Your Name"}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {formData.bio || "Your bio goes here..."}
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
                <p className="text-xs text-muted-foreground w-full text-center">
                  {formData.username
                    ? `linkgenius.com/${formData.username}`
                    : "Your unique URL will appear here"}
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
