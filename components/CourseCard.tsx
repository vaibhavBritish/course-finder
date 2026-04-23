"use client";

export interface Course {
  id: string;
  title: string;
  school: string;
  location: string;
  delivery: string[];
  load: string[];
  subject: string;
  credential: string;
  fee: string;
  imageUrl: string;
  link: string;
  description: string;
  timings: string;
  startDate: string;
  additionalStartDates: number;
  scholarshipAvailable: boolean;
  rating: number;
  ieltsRequirement: string;
  applicationDeadline: string;
}

interface CourseCardProps {
  course: Course;
  onOpenLeadModal: (course: Course) => void;
  isGrid?: boolean;
}

export default function CourseCard({ course, onOpenLeadModal, isGrid = false }: CourseCardProps) {
  const fallbackLogo = "/favicon.ico";
  const logoSrc = course.imageUrl?.trim() || fallbackLogo;

  const formatMonthYear = (value: string) => {
    if (!value) return "";

    // Supports ISO-like values from date inputs (YYYY-MM-DD).
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("en-CA", {
        month: "long",
        year: "numeric",
      });
    }

    // If value is already textual (e.g. "September"), keep it unchanged.
    return value;
  };

  const formattedStartDate = formatMonthYear(course.startDate);
  const formattedDeadline = formatMonthYear(course.applicationDeadline);

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg key={i} className={`w-4 h-4 ${i <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className={`bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] border border-slate-100 p-5 flex flex-col gap-4 transition-transform hover:-translate-y-1 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)] ${isGrid ? 'w-full' : 'w-[380px] flex-none snap-start'}`}>
      
      {/* Header: Logo and Title */}
      <div className="flex gap-4 items-start">
        <div className="w-12 h-12 shrink-0 relative rounded-lg overflow-hidden bg-white shadow-sm border border-slate-100 flex items-center justify-center p-1">
          <img
            src={logoSrc}
            alt={course.school}
            className="w-full h-full object-contain"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.endsWith(fallbackLogo)) return;
              target.src = fallbackLogo;
            }}
          />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">{course.school}</p>
          <h3 className="text-[15px] font-semibold text-slate-800 leading-snug line-clamp-2">{course.title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-3">
        {course.description}
      </p>

      {/* Split Info Table */}
      <div className="grid grid-cols-2 border border-slate-100 rounded-lg overflow-hidden">
        <div className="p-3 bg-slate-50">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Start Date</p>
          <p className="text-[13px] font-bold text-slate-900 leading-tight">{formattedStartDate}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Deadline: {formattedDeadline}</p>
        </div>
        <div className="p-3 border-l border-slate-100">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Tuition</p>
          <p className="text-[13px] font-bold text-slate-900 leading-tight">{course.fee}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">IELTS: {course.ieltsRequirement}</p>
        </div>
      </div>

      {/* Bottom: Features + CTA */}
      <div className="flex justify-between items-end pt-2 border-t border-slate-100">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[12px] text-slate-600">
            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{course.timings}</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-slate-600">
            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <span>{course.credential}</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] font-semibold text-[#ED2B3B]">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            <span>{course.scholarshipAvailable ? 'Scholarship Available' : 'No Financial Aid'}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 shrink-0">
          <div className="text-center">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Rating</p>
            <div className="flex gap-0.5">{renderStars(course.rating)}</div>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); onOpenLeadModal(course); }}
            className="bg-[#ED2B3B] hover:bg-[#D90038] text-white text-[12px] font-bold py-2.5 px-5 rounded-full transition-all whitespace-nowrap shadow-md shadow-red-500/20 active:scale-95"
          >
            Get package
          </button>
        </div>
      </div>
    </div>
  );
}

