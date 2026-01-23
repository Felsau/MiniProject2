"use client";

import { useState } from "react";

/* =======================
   🗄️ Mock Database
======================= */

type Color = {
  name: string;
  value: string;
};

const COLOR_DB: Color[] = [
  { name: "blue", value: "#3b82f6" },
  { name: "green", value: "#22c55e" },
  { name: "orange", value: "#f97316" },
  { name: "purple", value: "#a855f7" },
  { name: "pink", value: "#ec4899" },
  { name: "teal", value: "#14b8a6" },
  { name: "yellow", value: "#eab308" },
];

type Box = {
  id: number;
  color: Color;
};

export default function AboutPage() {
  /* =======================
     State
  ======================= */
  const [boxes, setBoxes] = useState<Box[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  /* =======================
     Layout config
  ======================= */
  const BOX_SIZE = 80;
  const GAP = 16;
  const STEP = BOX_SIZE + GAP;
  const CONTAINER_WIDTH = 600;
  const CONTAINER_HEIGHT = 300;
  const COLUMNS = Math.floor(CONTAINER_WIDTH / STEP);

  /* =======================
     Logic
  ======================= */

  const getRandomColor = (): Color =>
    COLOR_DB[Math.floor(Math.random() * COLOR_DB.length)];

  const handleAddBox = () => {
    setBoxes((prev) => [
      { id: Date.now(), color: getRandomColor() },
      ...prev,
    ]);
  };

  const handleSearch = () => {
    setActiveFilter(searchInput.trim().toLowerCase());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  /* =======================
     Filter from "DB"
  ======================= */
  const filteredBoxes = boxes.filter((box) =>
    activeFilter === ""
      ? true
      : box.color.name.includes(activeFilter)
  );

  /* =======================
     Render
  ======================= */
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        About Page
      </h1>

      {/* สร้างกล่อง */}
      <button
        onClick={handleAddBox}
        className="rounded-full bg-black px-6 py-3 text-white hover:bg-zinc-800 dark:bg-white dark:text-black"
      >
        สร้างแผ่นสี่เหลี่ยม (สุ่มสี)
      </button>

      {/* ค้นหา */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="ค้นหาสี เช่น blue, green"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[260px] rounded border px-4 py-2 text-sm
                     focus:outline-none focus:ring focus:ring-blue-300
                     dark:bg-zinc-900 dark:text-white"
        />

        <button
          onClick={handleSearch}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        >
          ค้นหา
        </button>
      </div>

      {/* พื้นที่แสดงผล */}
      <div
        className="relative overflow-y-auto border border-dashed border-zinc-400"
        style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
      >
        <div
          className="relative"
          style={{
            height: Math.ceil(filteredBoxes.length / COLUMNS) * STEP,
          }}
        >
          {filteredBoxes.map((box, index) => {
            const col = index % COLUMNS;
            const row = Math.floor(index / COLUMNS);

            return (
              <div
                key={box.id}
                className="absolute h-20 w-20 rounded-md
                           transition-transform duration-500 ease-in-out
                           flex items-center justify-center text-xs font-semibold text-white"
                style={{
                  backgroundColor: box.color.value,
                  transform: `translate(${col * STEP}px, ${row * STEP}px)`,
                }}
              >
                {box.color.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
