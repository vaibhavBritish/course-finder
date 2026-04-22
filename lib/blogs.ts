export type BlogCategory =
  | "All"
  | "Business"
  | "Technology"
  | "Design & Creative Arts"
  | "Skilled Trades"
  | "Healthcare"
  | "Rankings"
  | "Careers"
  | "Immigration";

export interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  content: string; // HTML string
  relatedSubjects: string[]; // used to query relevant courses
}

export const BLOGS: Blog[] = [
  {
    slug: "top-ai-jobs-canada-2025",
    title: "The Top AI & Machine Learning Jobs in Canada for 2025",
    excerpt:
      "Artificial intelligence is reshaping every sector of the Canadian economy. From Toronto's booming tech corridor to Vancouver's AI startups, here are the roles that matter most—and the programs that will get you there.",
    category: "Technology",
    author: "Michael Hartley",
    authorRole: "Founder & CEO",
    date: "April 18, 2025",
    readTime: "7 min read",
    coverImage: "/blog/blog-ai-jobs.png",
    tags: ["Artificial Intelligence", "Machine Learning", "Tech Careers", "Canada"],
    relatedSubjects: ["Data Science", "Computer Science", "Software Engineering"],
    content: `
<p class="lead">Canada is positioning itself as a global leader in artificial intelligence—and the job market reflects that ambition. With major investments from the federal government and world-class research institutions like the Vector Institute and Mila, the demand for AI talent has never been higher.</p>

<h2>Why AI Careers Are Surging in Canada</h2>
<p>The Canadian AI sector grew by <strong>34% year-over-year</strong> in 2024, adding over 18,000 net new positions. Cities like Toronto, Montreal, and Vancouver have become North American hotspots for AI research and product development, attracting global giants like Google DeepMind, Meta AI, and Scale AI.</p>

<p>But it's not just the tech giants driving demand. Healthcare, finance, agriculture, and government are all racing to embed AI into their operations—creating opportunities across every sector of the economy.</p>

<h2>The Most In-Demand AI Roles Right Now</h2>

<h3>1. Machine Learning Engineer</h3>
<p>Average salary: <strong>$115,000–$165,000/year</strong></p>
<p>ML Engineers bridge the gap between data science research and production-ready software. They build, deploy, and maintain the systems that run AI models at scale. Strong Python skills, experience with PyTorch or TensorFlow, and knowledge of cloud infrastructure (AWS, GCP, Azure) are essential.</p>

<h3>2. Data Scientist</h3>
<p>Average salary: <strong>$95,000–$145,000/year</strong></p>
<p>Data Scientists extract insights from complex datasets to guide business decisions. In Canada, financial services (RBC, TD, Shopify) and healthcare are the biggest employers. A master's degree in statistics, mathematics, or computer science is typically required for senior roles.</p>

<h3>3. AI Product Manager</h3>
<p>Average salary: <strong>$120,000–$175,000/year</strong></p>
<p>As AI moves from research labs to consumer products, companies desperately need PMs who understand both the technical and business dimensions of AI. This hybrid role is one of the fastest-growing and highest-paying in Canada's tech sector.</p>

<h3>4. NLP Engineer</h3>
<p>Average salary: <strong>$110,000–$160,000/year</strong></p>
<p>Natural Language Processing Engineers work on systems that understand, generate, and interact with human language—the backbone of chatbots, search engines, and AI assistants. With the explosion of large language models (LLMs), demand for NLP specialists has skyrocketed.</p>

<h2>The Right Education Path</h2>
<p>Most AI roles require at minimum a bachelor's degree in computer science, mathematics, or a related field. However, the fastest-growing pipeline is <strong>postgraduate certificates and professional master's programs</strong>—particularly those with co-op placements and industry partnerships.</p>

<p>Universities like the University of Toronto, University of Waterloo, and Simon Fraser University offer world-class AI and data science programs with direct pipelines to top employers. Bootcamps like BrainStation and Lighthouse Labs can accelerate career transitions for those with adjacent technical backgrounds.</p>

<h2>Looking Ahead</h2>
<p>Canada's National AI Strategy commits $2.4 billion over five years to AI research, compute infrastructure, and talent development. For students and career changers considering their next move, there has never been a better time to invest in AI skills.</p>

<blockquote>
  <p>"The next decade belongs to people who can work alongside AI—not against it. Canada is building the institutions to make that transition work for everyone."</p>
  <cite>— Vector Institute, 2024 Annual Report</cite>
</blockquote>
    `,
  },
  {
    slug: "nursing-shortage-canada-how-to-enter-healthcare",
    title: "Canada's Nursing Shortage: Why Healthcare Is the Career of the Decade",
    excerpt:
      "With over 60,000 nursing vacancies projected by 2030, Canada is experiencing its most severe healthcare staffing crisis in history. Here's what it means for students—and how to break into the field.",
    category: "Healthcare",
    author: "Elena Vasquez",
    authorRole: "Managing Editor",
    date: "April 12, 2025",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    tags: ["Nursing", "Healthcare", "Career Change", "Job Market"],
    relatedSubjects: ["Nursing", "Health Sciences", "Medicine"],
    content: `
<p class="lead">Canada's healthcare system is under unprecedented strain. An aging population, pandemic-era burnout, and decades of underinvestment have created a nursing shortage that experts describe as a national emergency—and a remarkable opportunity for the next generation of healthcare professionals.</p>

<h2>The Scale of the Crisis</h2>
<p>Statistics Canada projects a shortage of <strong>60,000 registered nurses by 2030</strong>. In some provinces, emergency rooms have been forced to close overnight due to staffing shortfalls. The situation is most acute in rural and remote communities, where the pay premium for nurses can reach 40% above urban rates.</p>

<p>But the shortage isn't limited to nursing. Canada needs tens of thousands more personal support workers (PSWs), respiratory therapists, medical lab technicians, and pharmacists over the same period.</p>

<h2>Why Now Is the Best Time to Enter Healthcare</h2>

<h3>Job Security Like No Other Field</h3>
<p>Healthcare is one of the few sectors virtually immune to automation and economic downturns. While AI is transforming diagnostics and administration, the hands-on, human-centred nature of patient care means that skilled nurses and practitioners will remain irreplaceable for decades.</p>

<h3>Salary Growth Has Been Dramatic</h3>
<p>The average registered nurse in Ontario now earns <strong>$87,000–$105,000/year</strong>, with experienced ICU and ER nurses exceeding $120,000. Nurse practitioners, who hold master's degrees and can prescribe medication and diagnose independently, average over $130,000.</p>

<h3>Immigration Pathways Are Wide Open</h3>
<p>The federal government has created dedicated Express Entry streams for healthcare workers, and several provinces have launched their own nominee programs targeting nurses and PSWs specifically. For internationally trained nurses, bridging programs at colleges like George Brown and Centennial can fast-track registration with the CNO.</p>

<h2>Your Education Options</h2>

<h3>Bachelor of Science in Nursing (BScN)</h3>
<p>The standard pathway for registered nurses. Programs typically run 4 years and include extensive clinical placements. Top programs include those at UBC, U of T, Western, and Dalhousie.</p>

<h3>Practical Nursing Diploma (PN)</h3>
<p>A 2-year college diploma that qualifies graduates to work as Licensed Practical Nurses (LPNs). LPNs earn $55,000–$75,000/year and can bridge to RN status with additional study.</p>

<h3>Personal Support Worker (PSW) Certificate</h3>
<p>The fastest entry point into healthcare—typically 6–12 months. PSW demand is exploding as Canada's seniors population grows. Many colleges offer weekend and online delivery for career changers.</p>

<h2>Bottom Line</h2>
<p>If you're looking for a career with <strong>ironclad job security, meaningful work, competitive pay, and clear paths to advancement</strong>, healthcare is Canada's most compelling opportunity. The system needs you—and the education paths have never been more accessible.</p>
    `,
  },
  {
    slug: "express-entry-canada-study-to-pr",
    title: "Study-to-PR: How a Canadian Degree Can Fast-Track Your Permanent Residency",
    excerpt:
      "For international students, Canada's immigration system offers one of the world's clearest pathways from student visa to permanent residency. Here's the complete guide to making it work for you.",
    category: "Immigration",
    author: "Arjun Sharma",
    authorRole: "Growth Marketing Manager",
    date: "April 5, 2025",
    readTime: "9 min read",
    coverImage: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&q=80",
    tags: ["Immigration", "Express Entry", "International Students", "Permanent Residency"],
    relatedSubjects: ["Business", "Engineering", "Computer Science"],
    content: `
<p class="lead">Canada accepts more international students than almost any other country—and it has deliberately designed its immigration system to turn many of them into permanent residents. If you understand the pathways, a Canadian degree or diploma is one of the most powerful immigration tools in the world.</p>

<h2>The Post-Graduation Work Permit (PGWP): Your Foundation</h2>
<p>The PGWP is the gateway for most international graduates. If you complete a program of 8 months or longer at a <strong>Designated Learning Institution (DLI)</strong>, you're eligible for a work permit equal to your program length—up to 3 years for degrees.</p>

<p>This work experience becomes the cornerstone of your Express Entry profile, dramatically increasing your Comprehensive Ranking System (CRS) score.</p>

<h2>Express Entry: How Points Work in Your Favour</h2>
<p>Canada's Express Entry system scores candidates on factors including:</p>
<ul>
  <li><strong>Age</strong> (maximum points in your 20s)</li>
  <li><strong>Education level</strong> (Canadian degrees score highest)</li>
  <li><strong>Language proficiency</strong> (IELTS/CELPIP)</li>
  <li><strong>Canadian work experience</strong></li>
  <li><strong>Arranged employment</strong></li>
  <li><strong>Provincial nomination</strong> (+600 CRS points)</li>
</ul>

<p>A Canadian bachelor's degree combined with 1 year of skilled work experience and a strong IELTS score can place you in a CRS range of <strong>430–480+</strong>—well within invitation territory for most draws.</p>

<h2>Provincial Nominee Programs (PNPs): The Shortcut</h2>
<p>Every province operates its own immigration stream, and many specifically target <strong>recent international graduates</strong> from their institutions. Ontario's International Student stream, BC's International Graduate category, and Alberta's Opportunity stream have all drawn candidates with CRS scores well below the federal Express Entry cut-off.</p>

<h3>Best Provinces for International Graduates (2025)</h3>

<h3>Ontario</h3>
<p>Largest labour market, strongest tech sector. The Ontario Immigrant Nominee Program (OINP) has dedicated streams for international graduates and draws happen multiple times per year.</p>

<h3>British Columbia</h3>
<p>BC PNP's International Graduate category targets graduates with job offers in BC. Tech, healthcare, and skilled trades are priority sectors.</p>

<h3>Saskatchewan & Manitoba</h3>
<p>Lower cost of living, faster processing times, and aggressive international graduate streams. Ideal for those willing to settle outside the largest metro areas.</p>

<h2>Choosing the Right Program for Immigration Success</h2>
<p>Not all programs are created equal for immigration purposes. The highest-value programs from an immigration standpoint are those that:</p>
<ol>
  <li>Lead to National Occupational Classification (NOC) TEER 0, 1, or 2 roles</li>
  <li>Are in shortage occupations (healthcare, skilled trades, tech, engineering)</li>
  <li>Offer co-op placements that can count as Canadian work experience</li>
  <li>Are offered at institutions in provinces with active PNP streams</li>
</ol>

<h2>Timeline: What a Realistic Study-to-PR Path Looks Like</h2>
<p><strong>Year 1–2:</strong> Complete your program, build language skills, apply for PGWP upon graduation.</p>
<p><strong>Year 2–3:</strong> Work full-time in a skilled role, build CRS score, apply to PNP streams or accumulate points for federal Express Entry.</p>
<p><strong>Year 3–4:</strong> Receive Invitation to Apply (ITA), submit PR application, receive Confirmation of Permanent Residence (COPR).</p>

<p>The whole journey—from first day of class to PR card—typically takes <strong>4 to 5 years</strong>, depending on the program, province, and occupation.</p>

<h2>Final Advice</h2>
<p>Start planning early, choose your program and institution strategically, and work with a Regulated Canadian Immigration Consultant (RCIC) if your situation is complex. Canada wants you to stay—the system is built to make it happen.</p>
    `,
  },
];

export function getBlogBySlug(slug: string): Blog | undefined {
  return BLOGS.find((b) => b.slug === slug);
}

export function getBlogsByCategory(category: BlogCategory): Blog[] {
  if (category === "All") return BLOGS;
  return BLOGS.filter((b) => b.category === category);
}
