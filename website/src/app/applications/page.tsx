"use client";

import { FileText, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">งานที่สมัครไปแล้ว</h1>
          <p className="text-gray-600">ติดตามสถานะการสมัครงานของคุณ</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">ทั้งหมด</span>
              <FileText className="text-blue-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">รอพิจารณา</span>
              <Clock className="text-yellow-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">ได้รับการติดต่อ</span>
              <CheckCircle className="text-green-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">ไม่ผ่าน</span>
              <XCircle className="text-red-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Empty State */}
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-500 text-lg font-medium">คุณยังไม่ได้สมัครงานใดๆ</p>
            <p className="text-gray-400 text-sm mt-1">เริ่มต้นค้นหาและสมัครงานที่คุณสนใจได้เลย</p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              ไปค้นหางาน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
