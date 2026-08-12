import React from "react";
import type { User } from "../../../types";

interface StudentTableProps {
  students: User[];
  isLoading: boolean;
  searchQuery: string;
  onEdit: (student: User) => void;
  onDelete: (student: User) => void;
  onOpenAddModal: () => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  isLoading,
  searchQuery,
  onEdit,
  onDelete,
  onOpenAddModal,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 animate-pulse space-y-3">
        <div className="h-6 bg-slate-100 rounded-full w-full"></div>
        <div className="h-6 bg-slate-100 rounded-full w-full"></div>
        <div className="h-6 bg-slate-100 rounded-full w-full"></div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="bg-white border border-slate-200/90 rounded-3xl p-12 text-center my-4 shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-300">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        </div>
        <h3 className="text-base font-extrabold text-slate-800">
          {searchQuery.trim() ? "لا توجد نتائج مطابقة للبحث" : "لا يوجد طلاب في هذه المجموعة حتى الآن"}
        </h3>
        <p className="text-xs text-slate-400 font-medium mt-1 mb-5">
          {searchQuery.trim()
            ? `لم يتم العثور على طالب يطابق "${searchQuery}"`
            : "اضغط على زر إدخال طالب لإضافة الطلاب لهذه المجموعة."}
        </p>
        {!searchQuery.trim() && (
          <button
            onClick={onOpenAddModal}
            className="bg-[#367ab8] text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md hover:bg-[#2d679c] transition-all cursor-pointer"
          >
            + إضافة طالب الآن
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs border-collapse">
          <thead className="bg-slate-50/90 border-b border-slate-100 text-slate-500 font-bold">
            <tr>
              <th className="py-3.5 px-4 text-center w-12 shrink-0">#</th>
              <th className="py-3.5 px-4 sticky right-0 bg-slate-50 z-10 border-l border-slate-100/60 min-w-[200px]">
                اسم الطالب / رقم الهاتف
              </th>
              <th className="py-3.5 px-4 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {students.map((student, index) => (
              <tr key={student._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-4 text-center font-bold text-slate-400 w-12">{index + 1}</td>


                <td className="py-3.5 px-4 sticky right-0 bg-white z-10 border-l border-slate-100/60">
                  <div className="font-extrabold text-slate-900 text-sm">{student.name}</div>
                  <div className="text-[11px] font-mono text-slate-400 dir-ltr text-right mt-0.5">
                    {student.phone || "-"}
                  </div>
                </td>


                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onEdit(student)}
                      className="p-1.5 text-slate-400 hover:text-[#367ab8] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="تعديل الطالب"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => onDelete(student)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="حذف الطالب"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
