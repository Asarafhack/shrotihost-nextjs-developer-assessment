import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6 flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400", className)}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="flex items-center hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <Home className="h-3.5 w-3.5 mr-1" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-slate-900 dark:text-slate-200" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
