"use client";

type Props = {
  isOpen: boolean;
  jobTitle: string;
  salary: string;
  description: string;
  location: string;
  onChangeTitle: (v: string) => void;
  onChangeSalary: (v: string) => void;
  onChangeDescription: (v: string) => void;
  onChangeLocation: (v: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export default function CreateJobModal({
  isOpen,
  jobTitle,
  salary,
  description,
  location,
  onChangeTitle,
  onChangeSalary,
  onChangeDescription,
  onChangeLocation,
  onClose,
  onSubmit,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[360px] rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
        <h2 className="mb-4 text-xl font-bold">เพิ่มตำแหน่งงาน</h2>

        {/* ชื่อตำแหน่ง */}
        <label className="text-sm">ชื่อตำแหน่งงาน</label>
        <input
          value={jobTitle}
          onChange={(e) => onChangeTitle(e.target.value)}
          className="mb-3 w-full rounded border px-3 py-2"
        />

        {/* เงินเดือน */}
        <label className="text-sm">เงินเดือน</label>
        <input
          value={salary}
          onChange={(e) => onChangeSalary(e.target.value)}
          className="mb-3 w-full rounded border px-3 py-2"
        />

        {/* รายละเอียด */}
        <label className="text-sm">รายละเอียด</label>
        <textarea
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          className="mb-3 w-full rounded border px-3 py-2"
        />

        {/* สถานที่ */}
        <label className="text-sm">สถานที่</label>
        <input
          value={location}
          onChange={(e) => onChangeLocation(e.target.value)}
          className="mb-4 w-full rounded border px-3 py-2"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-gray-200"
          >
            ยกเลิก
          </button>

          <button
            onClick={onSubmit}
            className="px-4 py-2 text-sm rounded bg-blue-600 text-white"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
