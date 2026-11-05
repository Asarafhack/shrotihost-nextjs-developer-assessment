import React from "react";
import Link from "next/link";
import { Server, Search, ArrowRight, Home, HelpCircle, Layers, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function NotFound() {
  return (
    <div className="py-20 sm:py-28 text-center">
      <Container size="narrow">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-xs font-semibold text-purple-700 dark:text-purple-300 mb-6">
          <Badge variant="purple" size="sm">HTTP 404</Badge>
          <span>Route Not Found</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          We Couldn&apos;t Find That Page
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          The link you followed may be outdated, moved, or entered incorrectly. Use the quick pathways below to return to our core hosting and service offerings.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md">
            <Home className="h-4 w-4 mr-1.5" />
            <span>Return to Homepage</span>
          </Button>
          <Button href="/hosting" variant="outline" size="md">
            <Server className="h-4 w-4 mr-1.5" />
            <span>Explore Hosting Plans</span>
          </Button>
          <Button href="/contact" variant="ghost" size="md">
            <Mail className="h-4 w-4 mr-1.5" />
            <span>Contact Support Desk</span>
          </Button>
        </div>

        {/* Helpful Popular Recovery Links Grid */}
        <div className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 text-center">
            Popular Destinations
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto text-xs">
            <Link
              href="/hosting"
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-purple-500/40 transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 block">NVMe Shared Hosting</span>
                <span className="text-slate-500">From ₹49/month with same-price renewal</span>
              </div>
              <ArrowRight className="h-4 w-4 text-purple-600" />
            </Link>

            <Link
              href="/domains"
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-purple-500/40 transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 block">Domain Search</span>
                <span className="text-slate-500">.com, .in, .net transparent pricing</span>
              </div>
              <ArrowRight className="h-4 w-4 text-purple-600" />
            </Link>

            <Link
              href="/advisor"
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-purple-500/40 transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 block">Hosting Plan Advisor</span>
                <span className="text-slate-500">Find the right plan for your workload</span>
              </div>
              <ArrowRight className="h-4 w-4 text-purple-600" />
            </Link>

            <Link
              href="/vps"
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-purple-500/40 transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100 block">High-Performance VPS</span>
                <span className="text-slate-500">Root access and 1 Gbps uplink</span>
              </div>
              <ArrowRight className="h-4 w-4 text-purple-600" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
