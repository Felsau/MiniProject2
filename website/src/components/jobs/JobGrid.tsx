"use client";

import { useState } from "react";
import { Job } from "./types";

type Props = {
  jobs: Job[];
};

export default function JobGrid({ jobs }: Props) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const BOX_SIZE = 120;
  const GAP = 16;
  const STEP = BOX_SIZE + GAP;
  const CONTAINER_WIDTH = 600;
  const CONTAINER_HEIGHT = 300;
  const COLUMNS = Math.floor(CONTAINER_WIDTH / STEP);

  return (
    <>
      {/* Grid */}
      <div
        className="relative overflow-y-auto border border-dashed border-zinc-400 rounded-md"
        style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
      >
        <div
          className="relative"
          style={{
            height: Math.ceil(jobs.length / COLUMNS) * STEP,
          }}
        >
          {jobs.map((job, index) => {
            const col = index % COLUMNS;
            const row = Math.floor(index / COLUMNS);

            return (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="absolute h-[120px] w-[120px]
                           rounded-md bg-blue-600 text-white
                           cursor-pointer transition-all
                           hover:scale-105 hover:bg-blue-700
                           flex flex-col items-center justify-center
                           text-center px-2"
                style={{
                  transform: `translate(${col * STEP}px, ${row * STEP}px)`,
                }}
              >
                <div className="text-sm font-bold line-clamp-2">
                  {job.title}
                </div>
                <div className="mt-1 text-xs text-blue-100">
                  {job.salary}
                </div>
                <div className="text-[10px] text-blue-200">
                  {job.location}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[360px] rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-bold mb-2">
              {selectedJob.title}
            </h2>

            <p className="text-sm text-gray-700 mb-1">
              💰 เงินเดือน: {selectedJob.salary}
            </p>

            <p className="text-sm text-gray-700 mb-1">
              📍 สถานที่: {selectedJob.location}
            </p>

            <p className="mt-3 text-sm text-gray-800">
              {selectedJob.description}
            </p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedJob(null)}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
