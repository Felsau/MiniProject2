

"use client";

export const runtime = "nodejs";

import { useState, useEffect, useCallback } from "react";
import JobGrid from "@/components/jobs/JobGrid";
import CreateJobModal from "@/components/jobs/CreateJobModal";
import { Job } from "@/components/jobs/types";
import { getJobsAction, createJobAction } from "@/actions/jobActions";

export default function AboutPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);

  // โหลดข้อมูลงาน
  const fetchJobs = useCallback(async () => {
    try {
      const data = await getJobsAction();
      setJobs(data as Job[]);
    } catch (error) {
      console.error("Fetch jobs failed:", error);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // เพิ่มงานใหม่
  const handleCreateJob = async () => {
  if (loading) return;

  if (!jobTitle.trim() || !salary.trim()) {
    alert("กรุณากรอกชื่อตำแหน่งและเงินเดือน");
    return;
  }

  if (isNaN(Number(salary))) {
    alert("เงินเดือนต้องเป็นตัวเลขเท่านั้น");
    return;
  }

  try {
    setLoading(true);

    await createJobAction({
      title: jobTitle.trim(),
      salary: String(salary),
      description: description.trim(),
      location: location.trim(),
    });

    await fetchJobs();

    // Reset form
    setJobTitle("");
    setSalary("");
    setDescription("");
    setLocation("");
    setIsModalOpen(false);

    alert("เพิ่มตำแหน่งงานสำเร็จ!");
  } catch (error: unknown) {
    console.error("Create job failed:", error);

    const message =
      error instanceof Error
        ? error.message
        : "เกิดข้อผิดพลาดบางอย่าง";

    alert("เกิดข้อผิดพลาด: " + message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black
                    flex flex-col items-center justify-center gap-6">

      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        สมัครงาน
      </h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-full bg-black px-6 py-3 text-white
                   hover:bg-zinc-800 dark:bg-white dark:text-black"
      >
        เพิ่มตำแหน่งงาน
      </button>

      {loading ? (
        <p className="text-zinc-500">กำลังโหลดข้อมูล...</p>
      ) : (
        <JobGrid jobs={jobs} />
      )}

      <CreateJobModal
        isOpen={isModalOpen}
        jobTitle={jobTitle}
        salary={salary}
        description={description}
        location={location}
        onChangeTitle={setJobTitle}
        onChangeSalary={setSalary}
        onChangeDescription={setDescription}
        onChangeLocation={setLocation}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateJob}
      />
    </div>
  );
}
