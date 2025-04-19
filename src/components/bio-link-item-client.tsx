"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { createClient } from "../../supabase/client";

interface BioLinkItemProps {
  item: {
    id: string;
    bio_link_id: string;
    title: string;
    url: string;
    clicks: number;
  };
}

export default function BioLinkItemClient({ item }: BioLinkItemProps) {
  const [isClicked, setIsClicked] = useState(false);
  const supabase = createClient();

  const handleClick = async () => {
    setIsClicked(true);

    // Track click
    await supabase
      .from("bio_link_items")
      .update({ clicks: (item.clicks || 0) + 1 })
      .eq("id", item.id);
  };

  return (
    <Link
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${isClicked ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"}`}
    >
      <span>{item.title}</span>
      <ExternalLink className="h-4 w-4" />
    </Link>
  );
}
