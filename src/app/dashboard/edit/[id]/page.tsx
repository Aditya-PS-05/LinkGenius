"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../../supabase/client";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlusCircle,
  Trash2,
  GripVertical,
  Link as LinkIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function EditBioLink({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [bioLink, setBioLink] = useState<any>(null);
  const [linkItems, setLinkItems] = useState<any[]>([]);
  const [newLinkItem, setNewLinkItem] = useState({ title: "", url: "" });

  useEffect(() => {
    const fetchBioLink = async () => {
      setIsLoading(true);

      // Check if user is authenticated
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/sign-in");
        return;
      }

      // Fetch bio link
      const { data: bioLinkData, error: bioLinkError } = await supabase
        .from("bio_links")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (bioLinkError || !bioLinkData) {
        toast({
          title: "Error",
          description:
            "Bio link not found or you don't have permission to edit it",
          variant: "destructive",
        });
        router.push("/dashboard/links");
        return;
      }

      setBioLink(bioLinkData);

      // Fetch link items
      const { data: linkItemsData } = await supabase
        .from("bio_link_items")
        .select("*")
        .eq("bio_link_id", id)
        .order("position", { ascending: true });

      setLinkItems(linkItemsData || []);
      setIsLoading(false);
    };

    fetchBioLink();
  }, [id, router, supabase, toast]);

  const handleBioLinkChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setBioLink({ ...bioLink, [id]: value });
  };

  const handleNewLinkItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewLinkItem({ ...newLinkItem, [id.replace("new-", "")]: value });
  };

  const handleLinkItemChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const updatedItems = [...linkItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setLinkItems(updatedItems);
  };

  const addLinkItem = async () => {
    if (!newLinkItem.title || !newLinkItem.url) {
      toast({
        title: "Error",
        description: "Title and URL are required",
        variant: "destructive",
      });
      return;
    }

    // Add http:// if missing
    let url = newLinkItem.url;
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    const position = linkItems.length;

    const { data, error } = await supabase
      .from("bio_link_items")
      .insert([
        {
          bio_link_id: id,
          title: newLinkItem.title,
          url,
          position,
        },
      ])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add link",
        variant: "destructive",
      });
      return;
    }

    setLinkItems([...linkItems, data]);
    setNewLinkItem({ title: "", url: "" });

    toast({
      title: "Success",
      description: "Link added successfully",
    });
  };

  const removeLinkItem = async (index: number) => {
    const itemToRemove = linkItems[index];

    const { error } = await supabase
      .from("bio_link_items")
      .delete()
      .eq("id", itemToRemove.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove link",
        variant: "destructive",
      });
      return;
    }

    const updatedItems = linkItems.filter((_, i) => i !== index);

    // Update positions for remaining items
    for (let i = 0; i < updatedItems.length; i++) {
      if (updatedItems[i].position !== i) {
        await supabase
          .from("bio_link_items")
          .update({ position: i })
          .eq("id", updatedItems[i].id);

        updatedItems[i].position = i;
      }
    }

    setLinkItems(updatedItems);

    toast({
      title: "Success",
      description: "Link removed successfully",
    });
  };

  const saveBioLink = async () => {
    setIsSaving(true);

    // Update bio link details
    const { error: bioLinkError } = await supabase
      .from("bio_links")
      .update({
        title: bioLink.title,
        username: bioLink.username,
        bio: bioLink.bio,
        template: bioLink.template,
      })
      .eq("id", id);

    if (bioLinkError) {
      toast({
        title: "Error",
        description: "Failed to update bio link",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    // Update all link items
    for (const item of linkItems) {
      await supabase
        .from("bio_link_items")
        .update({
          title: item.title,
          url: item.url,
          position: item.position,
        })
        .eq("id", item.id);
    }

    toast({
      title: "Success",
      description: "Bio link updated successfully",
    });

    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <>
        <DashboardNavbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p>Loading...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Edit Bio Link</h1>
            <p className="text-muted-foreground">
              Update your bio link page and manage your links
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/${bioLink.username}`)}
              className="flex items-center gap-2"
            >
              <LinkIcon className="h-4 w-4" />
              View Page
            </Button>
            <Button onClick={saveBioLink} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Bio Link Details</CardTitle>
                <CardDescription>
                  Update the basic information for your bio link page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Page Title</Label>
                    <Input
                      id="title"
                      value={bioLink.title || ""}
                      onChange={handleBioLinkChange}
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
                        value={bioLink.username || ""}
                        onChange={handleBioLinkChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={bioLink.bio || ""}
                      onChange={handleBioLinkChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Links</CardTitle>
                <CardDescription>
                  Add, edit, or remove links from your bio link page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Existing Links */}
                  {linkItems.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Your Links</h3>
                      {linkItems.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 p-3 border rounded-md bg-background"
                        >
                          <div className="cursor-move text-muted-foreground">
                            <GripVertical className="h-5 w-5" />
                          </div>
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                            <Input
                              placeholder="Link Title"
                              value={item.title}
                              onChange={(e) =>
                                handleLinkItemChange(
                                  index,
                                  "title",
                                  e.target.value,
                                )
                              }
                            />
                            <Input
                              placeholder="URL"
                              value={item.url}
                              onChange={(e) =>
                                handleLinkItemChange(
                                  index,
                                  "url",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeLinkItem(index)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add New Link */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Add New Link</h3>
                    <div className="flex items-center gap-2 p-3 border rounded-md bg-background">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Input
                          id="new-title"
                          placeholder="Link Title"
                          value={newLinkItem.title}
                          onChange={handleNewLinkItemChange}
                        />
                        <Input
                          id="new-url"
                          placeholder="URL (e.g., https://example.com)"
                          value={newLinkItem.url}
                          onChange={handleNewLinkItemChange}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addLinkItem}
                        className="whitespace-nowrap"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Link
                      </Button>
                    </div>
                  </div>
                </div>
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
                  <div className="aspect-[9/16] bg-gray-100 rounded-md flex flex-col items-center justify-start p-4 overflow-auto">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mb-3"></div>
                    <p className="font-medium">
                      {bioLink.title || "Your Name"}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4 text-center">
                      {bioLink.bio || "Your bio goes here..."}
                    </p>

                    <div className="w-full space-y-2">
                      {linkItems.length > 0 ? (
                        linkItems.map((item, index) => (
                          <div
                            key={index}
                            className="w-full p-2 bg-white border rounded-md text-center"
                          >
                            {item.title}
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                          <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                          <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
