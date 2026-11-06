"use client";

import React, { useState } from "react";
import { Server, Zap, Shield, HardDrive, Cpu, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function ArchitectureDiagram() {
  const [activeTab, setActiveTab] = useState<"litespeed" | "nvme" | "isolation">("litespeed");

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-white p-6 sm:p-8 shadow-xl overflow-hidden relative">
      {/* Background grid accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <Badge variant="purple" size="sm">Kernel-Level Acceleration</Badge>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Hardware & Web Server Topology
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Architectural comparison of Shroti Host production infrastructure vs legacy hosting setups.
            </p>
          </div>

          {/* Interactive Mode Selector */}
          <div className="flex rounded-xl bg-slate-800 p-1 border border-slate-700 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab("litespeed")}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
                activeTab === "litespeed"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              )}
            >
              LiteSpeed vs Apache
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("nvme")}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
                activeTab === "nvme"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              )}
            >
              NVMe vs SATA SSD
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("isolation")}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
                activeTab === "isolation"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              )}
            >
              CloudLinux Isolation
            </button>
          </div>
        </div>

        {/* Tab 1: LiteSpeed vs Apache */}
        {activeTab === "litespeed" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-purple-500/40 bg-purple-950/20 p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm text-purple-300 flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-purple-400" />
                  Shroti Host: LiteSpeed Enterprise
                </span>
                <Badge variant="purple" size="sm">Event-Driven Architecture</Badge>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1 text-slate-300">
                    <span>Concurrency &amp; Memory Efficiency</span>
                    <span className="font-mono font-bold text-purple-400">High Efficiency (RAM Cache)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[90%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-slate-300">
                    <span>PHP Worker Overhead</span>
                    <span className="font-mono font-bold text-emerald-400">Minimal (Direct Cache Bypass)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[25%]" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-800 leading-relaxed">
                  Asynchronous event-driven I/O model directly reads cache from RAM without spawning heavy PHP workers for static and cached pages.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-5 opacity-70">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm text-slate-300 flex items-center gap-1.5">
                  <Server className="h-4 w-4 text-slate-400" />
                  Legacy Hosting: Apache Threaded Model
                </span>
                <span className="text-xs text-red-400">Process Contention</span>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1 text-slate-400">
                    <span>Concurrency &amp; Memory Efficiency</span>
                    <span className="font-mono text-slate-400">Low (Process-per-Request)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-600 w-[30%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-slate-400">
                    <span>PHP Worker Overhead</span>
                    <span className="font-mono text-red-400">High (Spawns Thread per Visitor)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[85%]" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-800 leading-relaxed">
                  Creates dedicated process threads per request. Under traffic surges, process queues exhaust server RAM and cause HTTP 503 throttling.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: NVMe vs SATA SSD */}
        {activeTab === "nvme" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-purple-500/40 bg-purple-950/20 p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm text-purple-300 flex items-center gap-1.5">
                  <HardDrive className="h-4 w-4 text-purple-400" />
                  Enterprise PCIe Gen4 NVMe
                </span>
                <Badge variant="purple" size="sm">PCIe Bus Throughput</Badge>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1 text-slate-300">
                    <span>Interface Architecture</span>
                    <span className="font-mono font-bold text-purple-400">Direct PCIe Lanes</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[95%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-slate-300">
                    <span>Database I/O Wait Latency</span>
                    <span className="font-mono font-bold text-emerald-400">Near-Zero Microsecond Queue</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[15%]" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-800 leading-relaxed">
                  Direct connection via PCI Express lanes bypasses the legacy SATA bus bottleneck, accelerating MySQL database table joins and media delivery.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-5 opacity-70">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm text-slate-300 flex items-center gap-1.5">
                  <HardDrive className="h-4 w-4 text-slate-400" />
                  Standard SATA SSD / HDD
                </span>
                <span className="text-xs text-red-400">Bus Bottleneck</span>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1 text-slate-400">
                    <span>Interface Architecture</span>
                    <span className="font-mono text-slate-400">Legacy SATA-III Cable</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-600 w-[20%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-slate-400">
                    <span>Database I/O Wait Latency</span>
                    <span className="font-mono text-red-400">SATA Queue Serialization</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[75%]" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-800 leading-relaxed">
                  Legacy SATA-III interface caps throughput at 600 MB/s, creating heavy database I/O wait times during simultaneous WordPress queries.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: CloudLinux OS Isolation */}
        {activeTab === "isolation" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
              <div className="flex items-center gap-2 mb-2 font-semibold text-purple-300">
                <Shield className="h-4 w-4 text-purple-400" />
                <span>LVE Virtualization</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Each cPanel account resides in its own isolated Lightweight Virtual Environment (LVE) with dedicated CPU, RAM, and IOPS caps.
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
              <div className="flex items-center gap-2 mb-2 font-semibold text-emerald-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Zero Noisy Neighbors</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                If another website on the physical server experiences a denial-of-service attack or traffic spike, your website operates unhindered.
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
              <div className="flex items-center gap-2 mb-2 font-semibold text-blue-300">
                <Cpu className="h-4 w-4 text-blue-400" />
                <span>CageFS Sandboxing</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Encapsulates each user in a virtualized per-user filesystem, preventing cross-tenant access to sensitive configuration files or passwords.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
