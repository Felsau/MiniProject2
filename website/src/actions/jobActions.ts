// src/actions/jobActions.ts

"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// ไม่ต้องมี adapter หรือ config อะไรทั้งนั้น แค่สร้างใหม่เลย
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function createJobAction(data: {
  title: string;
  salary: string;
  description: string;
  location: string;
}) {
  try {
    await prisma.jobs.create({
      data: {
        title: data.title,
        salary: data.salary,
        description: data.description,
        location: data.location,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);
    throw new Error("ไม่สามารถบันทึกข้อมูลได้");
  }
}

export async function getJobsAction() {
  try {
    return await prisma.jobs.findMany({
      orderBy: { id: "desc" },
    });
  } catch (error) {
    console.error("GET JOBS ERROR:", error);
    return [];
  }
}