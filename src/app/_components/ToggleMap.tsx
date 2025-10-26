"use client";

import { useState } from "react";

export default function ToggleMap() {
  // بيانات الفروع مع الإحداثيات
  const branches = [
    {
      id: 1,
      name: "فرع زهراء المعادي",
      address: "القاهرة - شارع التحرير",
      lat: 30.0444,
      lng: 31.2357,
    },
    {
      id: 2,
      name: "فرع الرياض",
      address: "الإسكندرية - محطة الرمل",
      lat: 31.2001,
      lng: 29.9187,
    },
    {
      id: 3,
      name: "فرع جدة",
      address: "المنصورة - شارع جيهان",
      lat: 31.0364,
      lng: 31.3807,
    },
    {
      id: 4,
      name: "فرع الخبر",
      address: "المنصورة - شارع جيهان",
      lat: 31.0364,
      lng: 31.3807,
    },
  ];

  // الفرع المختار
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      {/* أزرار الفروع */}
      <div className="flex gap-3 justify-center">
        {branches.map((branch) => (
          <button
            key={branch.id}
            onClick={() => setSelectedBranch(branch)}
            className={`px-4 py-2 rounded-lg shadow transition 
    transform duration-200 
    ${
      selectedBranch.id === branch.id
        ? "bg-blue-600 text-white scale-105"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
    }`}
          >
            {branch.name}
          </button>
        ))}
      </div>

      {/* الخريطة */}
      <div className="mt-6 w-full h-80 rounded-lg overflow-hidden shadow-lg">
        <iframe
          title={selectedBranch.name}
          width="100%"
          height="100%"
          className=" rounded-e-lg"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${selectedBranch.lat},${selectedBranch.lng}&hl=ar&z=15&output=embed`}
        />
      </div>
    </div>
  );
}
