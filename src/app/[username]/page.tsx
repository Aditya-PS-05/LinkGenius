import { createClient } from "../../../supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function BioLinkPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const supabase = await createClient();

  // Fetch the bio link data
  const { data: bioLink, error } = await supabase
    .from("bio_links")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !bioLink) {
    return notFound();
  }

  // Increment view count
  await supabase
    .from("bio_links")
    .update({ views: (bioLink.views || 0) + 1 })
    .eq("id", bioLink.id);

  // Fetch the user data
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", bioLink.user_id)
    .single();

  // Fetch links for this bio link
  const { data: links } = await supabase
    .from("bio_link_items")
    .select("*")
    .eq("bio_link_id", bioLink.id)
    .order("position", { ascending: true });

  const bioLinkItems = links || [];

  // Track click function will be handled client-side

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-4">
            {/* Avatar placeholder */}
          </div>
          <h1 className="text-2xl font-bold text-center">{bioLink.title}</h1>
          {bioLink.bio && (
            <p className="text-gray-600 text-center mt-2">{bioLink.bio}</p>
          )}
        </div>

        {/* Links Section */}
        <div className="space-y-3 w-full">
          {bioLinkItems.length > 0 ? (
            bioLinkItems.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <span>{item.title}</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No links added yet</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Powered by{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              LinkGenius
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
