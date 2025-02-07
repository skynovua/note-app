import { NotebookIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

export const Header = () => {
  return (
    <header className="bg-background text-foreground container mx-auto p-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-x-2">
          <NotebookIcon size={24} />
          <span className="font-bold">Note App</span>
        </Link>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/create">Create Note</Link>
          </Button>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};
