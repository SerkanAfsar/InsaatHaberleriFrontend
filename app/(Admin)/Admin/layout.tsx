import { MainAdminMenuData } from "@/lib";
import { AppSidebar } from "@/components/utils/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider className="admin-theme">
      <AppSidebar data={MainAdminMenuData} />
      <SidebarInset className="min-h-screen bg-slate-50">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-7">
          <SidebarTrigger className="text-slate-600 hover:bg-teal-50 hover:text-teal-800" />
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-teal-700 uppercase">
              Haber App
            </p>
            <p className="text-sm font-medium text-slate-700">
              Yönetim Paneli
            </p>
          </div>
        </header>
        <div className="mx-auto w-full max-w-screen-2xl flex-1 p-4 md:p-7">
          {children}
        </div>
      </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
