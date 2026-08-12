import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getGroupsApi,
  createGroupApi,
  updateGroupApi,
  deleteGroupApi,
} from "../features/groups/api";
import {
  GroupCard,
  GroupFilterBar,
  GroupFormModal,
  DeleteGroupModal,
} from "../features/groups/components";
import type { Group, AcademicLevel } from "../types";
import type { ApiErrorResponse } from "../services/apiClient";

export const GroupsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query state
  const currentLevelParam = searchParams.get("level") as AcademicLevel | null;
  const activeLevelFilter: AcademicLevel | "all" =
    currentLevelParam && ["first", "second", "third"].includes(currentLevelParam)
      ? currentLevelParam
      : "all";

  // Data & Fetching State
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGroups, setTotalGroups] = useState(0);

  // Feedback Toast
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal States
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [formName, setFormName] = useState("");
  const [formLevel, setFormLevel] = useState<AcademicLevel>("first");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Delete State
  const [deletingGroup, setDeletingGroup] = useState<Group | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Fetch Groups
  const fetchGroups = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const levelToFetch = activeLevelFilter === "all" ? undefined : activeLevelFilter;
      const response = await getGroupsApi({
        level: levelToFetch,
        page,
        limit: 12,
      });

      setGroups(response.data || []);
      setTotalPages(response.totalPages || 1);
      setTotalGroups(response.total || 0);
    } catch (err: any) {
      const apiErr = err as ApiErrorResponse;
      setError(apiErr?.message || "حدث خطأ أثناء تحميل قائمة المجموعات.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [activeLevelFilter, page]);

  // Tab switch
  const handleLevelTabChange = (level: AcademicLevel | "all") => {
    setPage(1);
    if (level === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ level });
    }
  };

  // Client search filter
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groups;
    return groups.filter((g) =>
      g.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }, [groups, searchQuery]);

  // Handlers
  const handleOpenAddModal = () => {
    setEditingGroup(null);
    setFormName("");
    setFormLevel(activeLevelFilter === "all" ? "first" : activeLevelFilter);
    setModalError(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenEditModal = (group: Group) => {
    setEditingGroup(group);
    setFormName(group.name);
    setFormLevel(group.level as AcademicLevel);
    setModalError(null);
    setIsAddEditModalOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (!formName.trim()) {
      setModalError("اسم المجموعة مطلوب");
      return;
    }

    if (formName.trim().length < 3) {
      setModalError("اسم المجموعة يجب أن يتكون من 3 أحرف على الأقل");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingGroup) {
        await updateGroupApi(editingGroup._id, {
          name: formName.trim(),
          level: formLevel,
        });
        showToast("تم تعديل المجموعة بنجاح");
      } else {
        await createGroupApi({
          name: formName.trim(),
          level: formLevel,
        });
        showToast("تمت إضافة المجموعة بنجاح");
      }

      setIsAddEditModalOpen(false);
      fetchGroups();
    } catch (err: any) {
      const apiErr = err as ApiErrorResponse;
      if (apiErr.status === 400 && apiErr.message?.includes("already exists")) {
        setModalError("اسم المجموعة مستخدم بالفعل، الرجاء اختيار اسم آخر.");
      } else {
        setModalError(apiErr?.message || "حدث خطأ أثناء تنفيذ العملية.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteGroup = async () => {
    if (!deletingGroup) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteGroupApi(deletingGroup._id);
      showToast("تم حذف المجموعة بنجاح");
      setDeletingGroup(null);
      fetchGroups();
    } catch (err: any) {
      const apiErr = err as ApiErrorResponse;
      setDeleteError(apiErr?.message || "تعذر حذف المجموعة. الرجاء المحاولة لاحقاً.");
    } finally {
      setIsDeleting(false);
    }
  };

  const showToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Toast Notification */}
      {successMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm font-bold animate-bounce">
          <svg className="w-5 h-5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-6 bg-amber-400 rounded-full"></span>
            <h1 className="text-xl font-extrabold text-slate-900">إدارة المجموعات</h1>
            <span className="bg-[#367ab8]/10 text-[#367ab8] text-xs font-bold px-2.5 py-1 rounded-full mr-2">
              {totalGroups} مجموعة
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            عرض وتعديل المجموعات الدراسية لجميع المراحل الثانوية
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-[#367ab8] hover:bg-[#2d679c] active:bg-[#255581] text-white font-bold px-5 py-3 rounded-2xl text-xs shadow-md shadow-[#367ab8]/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>إضافة مجموعة جديدة</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <GroupFilterBar
        activeLevel={activeLevelFilter}
        searchQuery={searchQuery}
        onLevelChange={handleLevelTabChange}
        onSearchChange={setSearchQuery}
      />

      {/* Error Alert */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs sm:text-sm font-medium flex items-center gap-3">
          <svg className="w-5 h-5 text-rose-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Content Area */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 animate-pulse">
              <div className="h-5 bg-slate-100 rounded-full w-2/3"></div>
              <div className="h-4 bg-slate-100 rounded-full w-1/3"></div>
              <div className="h-10 bg-slate-100 rounded-2xl w-full mt-4"></div>
            </div>
          ))}
        </div>
      ) : filteredGroups.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-12 text-center my-6 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-base font-extrabold text-slate-800">
            {searchQuery.trim() ? "لا توجد نتائج مطابقة للبحث" : "لا توجد مجموعات مضافة لهذا الصف حتى الآن"}
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-1 mb-6">
            {searchQuery.trim()
              ? `لم يتم العثور على مجموعة تحتوي على "${searchQuery}"`
              : "يمكنك البدء بإضافة أول مجموعة دراسية لهذه المرحلة."}
          </p>
          {!searchQuery.trim() && (
            <button
              onClick={handleOpenAddModal}
              className="bg-[#367ab8] text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md hover:bg-[#2d679c] transition-all cursor-pointer"
            >
              إضافة مجموعة الآن
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGroups.map((group) => (
            <GroupCard
              key={group._id}
              group={group}
              onEdit={handleOpenEditModal}
              onDelete={setDeletingGroup}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            السابق
          </button>
          <span className="text-xs font-bold text-slate-500 px-3">
            صفحة {page} من {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            التالي
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <GroupFormModal
        isOpen={isAddEditModalOpen}
        editingGroup={editingGroup}
        formName={formName}
        formLevel={formLevel}
        isSubmitting={isSubmitting}
        error={modalError}
        onNameChange={setFormName}
        onLevelChange={setFormLevel}
        onSubmit={handleSubmitForm}
        onClose={() => setIsAddEditModalOpen(false)}
      />

      {/* Delete Modal */}
      <DeleteGroupModal
        deletingGroup={deletingGroup}
        isDeleting={isDeleting}
        error={deleteError}
        onConfirm={handleDeleteGroup}
        onClose={() => {
          setDeletingGroup(null);
          setDeleteError(null);
        }}
      />
    </div>
  );
};
