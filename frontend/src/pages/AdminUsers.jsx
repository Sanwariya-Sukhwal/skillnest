import React, { useEffect, useState } from 'react';
import { userAPI } from '../services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await userAPI.getAllUsers();

      setUsers(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to fetch users'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* ================= HEADER ================= */}
      <header className="h-[65px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-8">
        <div>
          <h1 className="text-[18px] font-bold text-[#0F172A]">
            Users
          </h1>

          <p className="text-[9px] text-[#64748B] mt-1">
            Manage SkillNest users
          </p>
        </div>

        <div className="bg-[#EEF2FF] text-[#6366F1] px-3 py-2 rounded-[6px] text-[10px] font-semibold">
          Total: {users.length}
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <div className="max-w-[1100px] mx-auto px-8 py-10">

        {/* Loading */}
        {loading && (
          <div className="bg-white border border-[#E2E8F0] rounded-[12px] py-16 text-center">
            <p className="text-[11px] text-[#64748B]">
              Loading users...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-white border border-red-200 rounded-[12px] py-16 text-center">
            <p className="text-[11px] text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchUsers}
              className="mt-4 bg-[#6366F1] text-white px-4 py-2 rounded-[6px] text-[10px] font-semibold hover:bg-[#5558E8] transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          users.length === 0 && (
            <div className="bg-white border border-[#E2E8F0] rounded-[12px] py-16 text-center">

              <div className="w-[45px] h-[45px] mx-auto mb-4 bg-[#EEF2FF] rounded-full flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="1.8"
                >
                  <circle cx="9" cy="8" r="3" />
                  <path d="M3 20c0-4 2.5-6 6-6s6 2 6 6" />
                  <path d="M16 5a3 3 0 0 1 0 6" />
                  <path d="M18 14c2 .5 3 2 3 4" />
                </svg>
              </div>

              <p className="text-[12px] font-semibold text-[#0F172A]">
                No users found
              </p>

              <p className="text-[9px] text-[#64748B] mt-1">
                No users are registered yet.
              </p>

            </div>
          )}

        {/* ================= USERS TABLE ================= */}
        {!loading &&
          !error &&
          users.length > 0 && (
            <div className="bg-white border border-[#E2E8F0] rounded-[12px] overflow-hidden">

              {/* Table Header */}
              <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">

                <div>
                  <h2 className="text-[13px] font-bold text-[#0F172A]">
                    All Users
                  </h2>

                  <p className="text-[9px] text-[#64748B] mt-1">
                    Registered users and administrators
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fetchUsers}
                  className="flex items-center gap-2 px-3 py-2 border border-[#E2E8F0] rounded-[6px] text-[9px] font-semibold text-[#475569] hover:border-[#6366F1] hover:text-[#6366F1] transition"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 11a8 8 0 1 0 1 4" />
                    <path d="M20 4v7h-7" />
                  </svg>

                  Refresh
                </button>

              </div>

              {/* Responsive Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px]">

                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">

                      <th className="text-left px-5 py-4 text-[9px] font-semibold text-[#64748B] uppercase">
                        User
                      </th>

                      <th className="text-left px-5 py-4 text-[9px] font-semibold text-[#64748B] uppercase">
                        Email
                      </th>

                      <th className="text-left px-5 py-4 text-[9px] font-semibold text-[#64748B] uppercase">
                        Role
                      </th>

                      <th className="text-left px-5 py-4 text-[9px] font-semibold text-[#64748B] uppercase">
                        Joined
                      </th>

                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#FAFAFA] transition"
                      >

                        {/* User */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">

                            <div className="w-[34px] h-[34px] rounded-full bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                              {user.name
                                ? user.name
                                    .charAt(0)
                                    .toUpperCase()
                                : '?'}
                            </div>

                            <div>
                              <p className="text-[10px] font-semibold text-[#0F172A]">
                                {user.name || 'Unknown User'}
                              </p>

                              <p className="text-[8px] text-[#64748B] mt-1">
                                ID: {user._id}
                              </p>
                            </div>

                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-5 py-4">
                          <p className="text-[10px] text-[#475569]">
                            {user.email || '—'}
                          </p>
                        </td>

                        {/* Role */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-[8px] font-semibold capitalize ${
                              user.role === 'admin'
                                ? 'bg-[#EEF2FF] text-[#6366F1]'
                                : 'bg-[#ECFDF5] text-[#059669]'
                            }`}
                          >
                            {user.role || 'user'}
                          </span>
                        </td>

                        {/* Joined */}
                        <td className="px-5 py-4">
                          <p className="text-[9px] text-[#64748B]">
                            {user.createdAt
                              ? new Date(
                                  user.createdAt
                                ).toLocaleDateString(
                                  'en-IN',
                                  {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  }
                                )
                              : '—'}
                          </p>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

            </div>
          )}

      </div>
    </div>
  );
};

export default AdminUsers;