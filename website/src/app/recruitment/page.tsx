import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import JobList from "@/components/recruitment/JobList";
import AddJobModal from "@/components/recruitment/AddJobModal";
import Pagination from "@/components/ui/Pagination";
import { Briefcase, Users, Filter, TrendingUp } from "lucide-react";

// 1. ปรับ Type ของ Props ให้รองรับ Promise (Next.js 15 standard)
type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function RecruitmentPage(props: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userRole = (session.user as { role?: string })?.role;

  // 2. Await searchParams เพื่อดึงค่า page ออกมา
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  
  // เพื่อความชัวร์ ลอง log ดูค่าใน Terminal ว่าเปลี่ยนเลขไหมตอนกดเปลี่ยนหน้า
  console.log("Current Page:", currentPage); 

  const itemsPerPage = 6;
  const skip = (currentPage - 1) * itemsPerPage;

  const [jobs, totalJobCount, fullTimeCount, partTimeCount, contractCount] = await Promise.all([
    prisma.job.findMany({
      take: itemsPerPage,
      skip: skip,
      include: {
        postedByUser: {
          select: {
            fullName: true,
            username: true,
          },
        },
      },
      // แนะนำให้เรียง 2 ชั้นเพื่อป้องกันข้อมูลสลับที่ถ้าเวลาเท่ากัน
      orderBy: [
        { createdAt: "desc" },
        { id: "desc" }
      ],
    }),
    prisma.job.count(),
    prisma.job.count({ where: { employmentType: "FULL_TIME" } }),
    prisma.job.count({ where: { employmentType: "PART_TIME" } }),
    prisma.job.count({ where: { employmentType: "CONTRACT" } }),
  ]);

  const totalPages = Math.ceil(totalJobCount / itemsPerPage);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* ... ส่วน Header และ Stats (เหมือนเดิม ไม่ต้องแก้) ... */}
      <div className="mb-8">
         {/* ... (Code เดิม) ... */}
         <div className="flex items-center justify-between mb-4">
           <div>
             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
               ระบบจัดหางาน
             </h1>
             <p className="text-gray-600 text-lg">จัดการตำแหน่งงานและรับสมัครพนักงานใหม่</p>
           </div>
           {(userRole === "HR" || userRole === "ADMIN") && (
             <AddJobModal />
           )}
         </div>
      </div>

       {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card-hover bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden">
          {/* ... (ส่วนตกแต่ง) ... */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase size={24} className="text-white" />
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                <TrendingUp size={12} />
                <span>100%</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">งานทั้งหมด</p>
            <p className="text-3xl font-bold text-gray-900">{totalJobCount}</p>
          </div>
        </div>
        {/* ... (Cards อื่นๆ ใส่เหมือนเดิมได้เลยครับ โดยใช้ตัวแปร fullTimeCount, partTimeCount ฯลฯ) ... */}
         <div className="card-hover bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden">
            <div className="relative z-10">
                <p className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">Full-time</p>
                <p className="text-3xl font-bold text-blue-600">{fullTimeCount}</p>
            </div>
         </div>
         {/* ... (ละไว้ในฐานที่เข้าใจ ใส่ให้ครบเหมือนเดิม) ... */}
      </div>

      {/* Job List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Briefcase size={24} className="text-blue-600" />
              รายการตำแหน่งงานทั้งหมด
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm">
              <Filter size={16} />
              ตัวกรอง
            </button>
          </div>
        </div>
        <div className="p-6">
          <JobList jobs={jobs} userRole={userRole} />
          
          <div className="mt-8 pt-6 border-t border-gray-100">
             <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}