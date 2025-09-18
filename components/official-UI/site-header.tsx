'use client'; // This must be a client component to use hooks

import { useState, useEffect } from 'react'; // Import useState and useEffect
import { usePathname } from 'next/navigation';
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../toggle-button";

const pageTitles: { [key: string]: string } = {
  '/': 'Dashboard',
  '/Jobs': 'All Jobs',
  '/Training': 'Training Courses',
  '/Account': 'My Account',
};

export function SiteHeader() {
  const pathname = usePathname();
  const [title, setTitle] = useState('Dashboard'); // Default title
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the initial render
    setIsMounted(true);
    setTitle(pageTitles[pathname] || 'Dashboard');
  }, [pathname]); // Re-run when the path changes

  // Also fixed a small typo in the className: h-(...) should be h-[...]
  return (
    <header className="flex h-[--header-height] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[--header-height] py-2">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium text-accent-foreground">
          {isMounted ? title : 'Dashboard'}
        </h1>
        <div className="ml-auto flex items-center gap-2" suppressHydrationWarning>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}