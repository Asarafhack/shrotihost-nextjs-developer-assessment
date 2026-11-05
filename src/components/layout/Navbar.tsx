"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Server,
  Infinity as InfinityIcon,
  Briefcase,
  Layers,
  Cpu,
  HelpCircle,
  GitCompare,
  Sliders,
  ShoppingCart,
  Globe,
  Smartphone,
  ShoppingBag,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MAIN_NAVIGATION, COMPANY_DETAILS } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hostingDropdownOpen, setHostingDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle sticky blur effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setHostingDropdownOpen(false);
    setToolsDropdownOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setHostingDropdownOpen(false);
        setToolsDropdownOpen(false);
        setServicesDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getIcon = (name?: string) => {
    switch (name) {
      case "Server":
        return <Server className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case "Wordpress":
        return <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case "Infinity":
        return <InfinityIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case "Briefcase":
        return <Briefcase className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case "Layers":
        return <Layers className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case "Cpu":
        return <Cpu className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case "HelpCircle":
        return <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "GitCompare":
        return <GitCompare className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "Sliders":
        return <Sliders className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "ShoppingCart":
        return <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "Globe":
        return <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case "Smartphone":
        return <Smartphone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case "ShoppingBag":
        return <ShoppingBag className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Server className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200 border-b",
        scrolled
          ? "border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90 shadow-sm"
          : "border-transparent bg-white/70 backdrop-blur-sm dark:bg-slate-950/70"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg p-1"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-md shadow-purple-500/20">
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                Shroti<span className="text-purple-600 dark:text-purple-400">Host</span>
              </span>
              <Badge variant="purple" size="sm" className="hidden sm:inline-flex py-0 text-[10px]">
                MSME
              </Badge>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-tight hidden sm:block">
              High-Speed Cloud Infra
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {/* Hosting Mega Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setHostingDropdownOpen(true)}
            onMouseLeave={() => setHostingDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setHostingDropdownOpen((prev) => !prev)}
              aria-expanded={hostingDropdownOpen}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors hover:text-purple-600 dark:hover:text-purple-400",
                pathname.startsWith("/hosting") ||
                  pathname.startsWith("/wordpress") ||
                  pathname.startsWith("/unlimited") ||
                  pathname.startsWith("/reseller") ||
                  pathname.startsWith("/vps")
                  ? "text-purple-600 dark:text-purple-400 font-semibold"
                  : "text-slate-700 dark:text-slate-200"
              )}
            >
              <span>Hosting</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-150",
                  hostingDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {hostingDropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-[520px] animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900 grid grid-cols-2 gap-2">
                  {MAIN_NAVIGATION.hosting.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex flex-col p-3 rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                          {getIcon(item.iconName)}
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <Badge variant="purple" size="sm">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                  <div className="col-span-2 mt-2 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                      All plans include Same-Price Renewal Guarantee
                    </span>
                    <Link
                      href="/compare"
                      className="font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      Compare all specs &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Domains Link */}
          <Link
            href="/domains"
            className={cn(
              "px-3 py-2 rounded-lg transition-colors hover:text-purple-600 dark:hover:text-purple-400",
              pathname === "/domains"
                ? "text-purple-600 dark:text-purple-400 font-semibold"
                : "text-slate-700 dark:text-slate-200"
            )}
          >
            Domains
          </Link>

          {/* Interactive Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setToolsDropdownOpen((prev) => !prev)}
              aria-expanded={toolsDropdownOpen}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors hover:text-purple-600 dark:hover:text-purple-400",
                pathname === "/advisor" || pathname === "/compare" || pathname === "/configurator" || pathname === "/checkout"
                  ? "text-purple-600 dark:text-purple-400 font-semibold"
                  : "text-slate-700 dark:text-slate-200"
              )}
            >
              <span>Tools</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-150",
                  toolsDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-[400px] animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-800 dark:bg-slate-900 flex flex-col gap-1">
                  {MAIN_NAVIGATION.tools.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-start gap-3 p-2.5 rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80"
                    >
                      <div className="mt-0.5">{getIcon(item.iconName)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                            {item.label}
                          </span>
                          {item.badge && (
                            <Badge variant="blue" size="sm">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesDropdownOpen((prev) => !prev)}
              aria-expanded={servicesDropdownOpen}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors hover:text-purple-600 dark:hover:text-purple-400",
                pathname.includes("development")
                  ? "text-purple-600 dark:text-purple-400 font-semibold"
                  : "text-slate-700 dark:text-slate-200"
              )}
            >
              <span>Services</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-150",
                  servicesDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {servicesDropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-[420px] animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-800 dark:bg-slate-900 flex flex-col gap-1">
                  {MAIN_NAVIGATION.services.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80"
                    >
                      <div className="mt-0.5">{getIcon(item.iconName)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                            {item.label}
                          </span>
                          {item.badge && (
                            <Badge variant="green" size="sm">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* About */}
          <Link
            href="/about"
            className={cn(
              "px-3 py-2 rounded-lg transition-colors hover:text-purple-600 dark:hover:text-purple-400",
              pathname === "/about"
                ? "text-purple-600 dark:text-purple-400 font-semibold"
                : "text-slate-700 dark:text-slate-200"
            )}
          >
            About
          </Link>

          {/* Blog */}
          <Link
            href="/blog"
            className={cn(
              "px-3 py-2 rounded-lg transition-colors hover:text-purple-600 dark:hover:text-purple-400",
              pathname.startsWith("/blog")
                ? "text-purple-600 dark:text-purple-400 font-semibold"
                : "text-slate-700 dark:text-slate-200"
            )}
          >
            Blog
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className={cn(
              "px-3 py-2 rounded-lg transition-colors hover:text-purple-600 dark:hover:text-purple-400",
              pathname === "/contact"
                ? "text-purple-600 dark:text-purple-400 font-semibold"
                : "text-slate-700 dark:text-slate-200"
            )}
          >
            Contact
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />

          <a
            href={COMPANY_DETAILS.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <span>Client Login</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <Button href="/hosting" size="sm" variant="primary">
            Explore Hosting
          </Button>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-150 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {/* Hosting Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
                Hosting Products
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                {MAIN_NAVIGATION.hosting.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-purple-600"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="purple" size="sm">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Tools Links */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                Interactive Tools & Discovery
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                <Link
                  href="/domains"
                  className="py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600"
                >
                  Domain Search & Pricing
                </Link>
                {MAIN_NAVIGATION.tools.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="blue" size="sm">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services Links */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                Software Services
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                {MAIN_NAVIGATION.services.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* General Pages */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-700 dark:text-slate-200 pl-2">
              <Link href="/about" className="hover:text-purple-600">
                About Us
              </Link>
              <Link href="/blog" className="hover:text-purple-600">
                Blog
              </Link>
              <Link href="/contact" className="hover:text-purple-600">
                Contact
              </Link>
              <Link href="/legal/terms" className="hover:text-purple-600 text-xs text-slate-500">
                Terms
              </Link>
              <Link href="/legal/privacy" className="hover:text-purple-600 text-xs text-slate-500">
                Privacy
              </Link>
            </div>

            {/* Mobile CTAs */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col gap-2">
              <Button href="/hosting" variant="primary" className="w-full">
                Explore Hosting Plans
              </Button>
              <Button
                href={COMPANY_DETAILS.portalUrl}
                isExternal
                variant="outline"
                className="w-full text-xs"
              >
                <span>Login to Client Portal</span>
                <ExternalLink className="h-3 w-3 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
