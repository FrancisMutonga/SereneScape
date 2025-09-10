import Sidebar from "./../components/navadmin";
import WithAdminAuth from "./../components/WithAdminAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WithAdminAuth>
      <div className="flex  min-h-screen bg-stone-50">
        <Sidebar />
        <div className="flex-grow p-4 md:p-6 overflow-x-auto mt-4">
          {children}
        </div>
      </div>
    </WithAdminAuth>
  );
}
