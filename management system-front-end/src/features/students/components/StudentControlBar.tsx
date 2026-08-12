import React from "react";

interface StudentControlBarProps {
  totalStudents: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const StudentControlBar: React.FC<StudentControlBarProps> = ({
  totalStudents,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-extrabold text-slate-900">قائمة الطلاب</h2>
        <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
          {totalStudents} طالب
        </span>
      </div>

      <div className="relative w-full sm:w-72">
        <input
          type="text"
          placeholder="بحث باسم الطالب أو الهاتف..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-[#367ab8] focus:ring-4 focus:ring-[#367ab8]/15 transition-all placeholder:text-slate-400"
        />
        <svg className="w-4 h-4 text-slate-400 absolute right-3.5 top-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};
