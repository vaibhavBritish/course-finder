import { notFound } from "next/navigation";
import SubjectHubPage from "@/components/SubjectHubPage";

const SUBJECT_DETAILS: Record<
  string,
  {
    title: string;
    author: string;
    updatedAt: string;
    intro: string;
    about: string;
    faqs: Array<{ q: string; a: string }>;
    certifications: string[];
    relatedSubjects: string[];
    resources: Array<{ category: string; title: string; author: string }>;
  }
> = {
  "data-science": {
    title: "Data Science",
    author: "CourseCompare",
    updatedAt: "April 19, 2026",
    intro:
      "Compare top-rated data science courses, certificates, degrees, and diplomas with leading education providers.",
    about:
      "Data science combines analytics, machine learning, and domain knowledge to solve practical business and research problems. Employers across industries rely on data talent for forecasting, optimization, and strategic planning.",
    faqs: [
      {
        q: "What qualifications help in data science?",
        a: "A degree/diploma in computing, statistics, or engineering plus strong Python, SQL, and analytics skills is a solid base.",
      },
      {
        q: "Where do data scientists work?",
        a: "Technology firms, banks, healthcare, consulting, government, education, and startups all hire data professionals.",
      },
    ],
    certifications: [
      "AWS Certified Machine Learning – Specialty",
      "Google Cloud Professional Data Engineer",
      "Microsoft Azure Data Scientist Associate",
    ],
    relatedSubjects: ["Data Analytics", "Machine Learning", "AI", "Computer Science"],
    resources: [
      { category: "Data Science", title: "Best Data Science Bootcamps of 2026", author: "CourseCompare" },
      { category: "Careers", title: "How to Become a Data Scientist", author: "CourseCompare" },
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    author: "CourseCompare",
    updatedAt: "April 19, 2026",
    intro:
      "Compare top digital marketing courses and certifications across SEO, paid media, social strategy, and analytics.",
    about:
      "Digital marketing roles continue to expand as businesses prioritize performance channels, lifecycle marketing, and measurable growth. Training programs focus on campaign strategy, optimization, and reporting.",
    faqs: [
      {
        q: "What skills matter most in digital marketing?",
        a: "SEO, paid media, analytics, content strategy, and experimentation are key skills for modern digital marketers.",
      },
      {
        q: "Can beginners start in digital marketing?",
        a: "Yes. Many certificate and bootcamp programs are designed for beginners with practical campaign-based learning.",
      },
    ],
    certifications: [
      "Google Ads Certifications",
      "Meta Blueprint Certifications",
      "HubSpot Inbound Marketing",
    ],
    relatedSubjects: ["SEO", "Social Media Marketing", "Content Marketing", "Data Analytics"],
    resources: [
      { category: "Marketing", title: "Best Digital Marketing Courses in Canada", author: "CourseCompare" },
      { category: "Careers", title: "How to Become a Digital Marketer", author: "CourseCompare" },
    ],
  },
  "product-management": {
    title: "Product Management",
    author: "CourseCompare",
    updatedAt: "April 19, 2026",
    intro:
      "Compare product management programs focused on strategy, roadmapping, user research, and execution.",
    about:
      "Product managers align user needs with business goals. Courses in this field emphasize discovery, prioritization, cross-functional leadership, and data-informed decision-making.",
    faqs: [
      {
        q: "Do I need a technical background for product management?",
        a: "Not always. Technical fluency helps, but communication, prioritization, and strategic thinking are equally important.",
      },
      {
        q: "What tools should product managers know?",
        a: "Common tools include Jira, analytics platforms, roadmap tools, and customer research systems.",
      },
    ],
    certifications: [
      "Product School Product Manager Certificate",
      "Scrum Product Owner (PSPO/CSPO)",
      "Pragmatic Product Certifications",
    ],
    relatedSubjects: ["Business Analysis", "UX/UI Design", "Agile", "Data Analytics"],
    resources: [
      { category: "Product", title: "Top Product Management Courses of 2026", author: "CourseCompare" },
      { category: "Careers", title: "How to Become a Product Manager", author: "CourseCompare" },
    ],
  },
  "social-media-marketing": {
    title: "Social Media Marketing",
    author: "CourseCompare",
    updatedAt: "April 19, 2026",
    intro:
      "Compare social media marketing programs covering content creation, channel growth, paid social, and analytics.",
    about:
      "Social media marketing blends creative storytelling with performance optimization. Programs teach content planning, audience development, creator collaboration, and campaign measurement.",
    faqs: [
      {
        q: "Which social platforms should marketers focus on?",
        a: "The best platform depends on audience and goals, but TikTok, Instagram, LinkedIn, and YouTube are common priorities.",
      },
      {
        q: "Is paid social necessary for growth?",
        a: "In many markets, paid social complements organic strategy and helps scale reach and conversions.",
      },
    ],
    certifications: [
      "Meta Social Media Marketing Professional Certificate",
      "Hootsuite Social Marketing Certification",
      "Google Analytics Certification",
    ],
    relatedSubjects: ["Digital Marketing", "Content Marketing", "Public Relations", "Brand Strategy"],
    resources: [
      { category: "Marketing", title: "Best Social Media Marketing Courses in Canada", author: "CourseCompare" },
      { category: "Careers", title: "Social Media Manager Salary Guide", author: "CourseCompare" },
    ],
  },
};

export default async function SubjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject = SUBJECT_DETAILS[slug];
  if (!subject) notFound();

  return <SubjectHubPage config={subject} />;
}

