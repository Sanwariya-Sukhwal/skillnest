import React from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../image/icon.svg';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white">

      <div className="max-w-[1060px] mx-auto px-6">

        {/* ================= TOP FOOTER ================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12">

          {/* Logo + Description */}

          <div className="md:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="w-[20px] h-[20px] bg-[#6366F1] rounded-[5px] flex items-center justify-center">
                <img
                  src={logoIcon}
                  alt="SkillNest"
                  className="w-[12px] h-[12px]"
                />
              </div>

              <span className="text-[12px] font-bold text-white">
                SkillNest
              </span>
            </Link>

            <p className="text-[9px] leading-[16px] text-[#64748B] max-w-[270px]">
              Discover short courses & workshops designed to help
              you upgrade your career and master new skills.
            </p>

          </div>


          {/* Popular Topics */}

          <div className="grid grid-cols-2 gap-8">

            <div>

              <h3 className="text-[8px] font-bold text-white uppercase mb-4">
                Popular Topics
              </h3>

              <div className="space-y-3">

                <Link
                  to="/explore-courses"
                  className="block text-[9px] text-[#64748B] hover:text-white transition"
                >
                  Web Development
                </Link>

                <Link
                  to="/explore-courses"
                  className="block text-[9px] text-[#64748B] hover:text-white transition"
                >
                  Java Programming
                </Link>

                <Link
                  to="/explore-courses"
                  className="block text-[9px] text-[#64748B] hover:text-white transition"
                >
                  UI/UX Design
                </Link>

                <Link
                  to="/explore-courses"
                  className="block text-[9px] text-[#64748B] hover:text-white transition"
                >
                  Product Management
                </Link>

              </div>

            </div>


            {/* Company */}

            <div>

              <h3 className="text-[8px] font-bold text-white uppercase mb-4">
                Company
              </h3>

              <div className="space-y-3">

                <Link
                  to="/"
                  className="block text-[9px] text-[#64748B] hover:text-white transition"
                >
                  About Us
                </Link>

                <Link
                  to="/"
                  className="block text-[9px] text-[#64748B] hover:text-white transition"
                >
                  Careers
                </Link>

                <Link
                  to="/"
                  className="block text-[9px] text-[#64748B] hover:text-white transition"
                >
                  Workshops
                </Link>

                <Link
                  to="/"
                  className="block text-[9px] text-[#64748B] hover:text-white transition"
                >
                  Contact
                </Link>

              </div>

            </div>

          </div>

        </div>


        {/* ================= BOTTOM FOOTER ================= */}

        <div className="border-t border-[#1E293B]">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-5">

            <p className="text-[8px] text-[#64748B]">
              © 2024 SkillNest. All rights reserved.
            </p>

            <div className="flex items-center gap-6">

              <button
                type="button"
                className="text-[8px] text-[#64748B] hover:text-white transition"
              >
                Privacy Policy
              </button>

              <button
                type="button"
                className="text-[8px] text-[#64748B] hover:text-white transition"
              >
                Terms of Service
              </button>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;