// Netflix-style CV with carousels and dynamic stats
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`bg-red-600 px-4 py-2 rounded text-white ${className}`}>
    {children}
  </button>
);
import { Download } from "lucide-react";

const tudum = new Audio("https://assets.mixkit.co/sfx/download/mixkit-game-show-suspense-waiting-667.wav");

const stats = [
  { label: "Current Job Role", value: "HR & Payroll Assistant", suffix: "" },
  { label: "Years of HR Experience", value: 5, suffix: "+" },
  { label: "CIPD Certification", value: "Level 3 (In Progress)", suffix: "" },
  { label: "CMI Diploma", value: "Level 7", suffix: "" }
];

const profiles = [
  {
    id: "summary",
    name: "HR Overview",
    avatar: "https://avatars.githubusercontent.com/u/123712320?v=4",
    section: {
      title: "Professional Summary",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
      bullets: [
        "Results-driven HR professional with Chartered Manager status",
        "Experienced across recruitment, payroll, employee relations",
        "Adept at onboarding, grievance handling, absence management",
        "Pursuing Level 3 CIPD to deepen HR expertise"
      ]
    }
  },
  {
    id: "experience",
    name: "HR Experience",
    avatar: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
    section: {
      title: "Key HR Experience",
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
      bullets: [
        "Handled 100+ HR queries/month as first point of contact",
        "Led onboarding & compliance for 20+ new hires/quarter",
        "Processed payroll for 200+ staff/month via Select Pay",
        "Reduced overtime by 15% through rota optimisation"
      ]
    }
  },
  {
    id: "skills",
    name: "HR Skills",
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
    section: {
      title: "HR Core Skills",
      image: "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg",
      bullets: [
        "HR Administration, Absence & Performance Management",
        "Recruitment & Onboarding, Payroll Management",
        "Employee Relations, Policies & Compliance",
        "Training, Health & Safety, Data Protection"
      ]
    }
  },
  {
    id: "education",
    name: "Education",
    avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    section: {
      title: "Education & Certification",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      bullets: [
        "MBA, University of Northampton – Merit",
        "BSc Biomedical Engineering, SRM Institute",
        "CIPD Level 3 (In Progress), CMI L7 Diploma",
        "Lean Six Sigma Green Belt, CRC Certified"
      ]
    }
  },
  {
    id: "contact",
    name: "Contact Me",
    avatar: "https://cdn-icons-png.flaticon.com/512/724/724664.png",
    section: {
      title: "Let's Connect",
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
      bullets: [
        "📧 deepak2012.dy@gmail.com",
        "📞 +44 7741 837087",
        "🔗 LinkedIn: /in/deepakdakshinamoorthy"
      ],
      actions: [
        { label: "Email", href: "mailto:deepak2012.dy@gmail.com" },
        { label: "Call", href: "tel:+447741837087" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/deepakdakshinamoorthy" }
      ]
    }
  }
];

export default function DeepFlixCV() {
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);

  useEffect(() => {
    tudum.play().catch(() => {});
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!selectedProfile && profiles.length > 1) {
      const interval = setInterval(() => {
        setPreviewIndex((prev) => (prev + 1) % profiles.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedProfile]);

  const safeProfile = profiles[previewIndex] || {};
  const safeSection = safeProfile.section || {};

  return (
    <div className="min-h-screen bg-black text-white">
      <style>
        {`
          .carousel-scroll::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <motion.h1
            className="text-6xl font-bold text-red-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            DeepFlix
          </motion.h1>
          <p className="text-zinc-400 mt-3">Loading profiles…</p>
        </div>
      ) : !selectedProfile ? (
        <div className="px-6 py-16 min-h-screen flex flex-col items-center justify-start">
          <div className="mb-8 w-full max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Featured Preview</h2>
            {safeSection.image && (
              <motion.div
                key={safeProfile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-zinc-900 rounded-xl overflow-hidden"
              >
                <img
                  src={safeSection.image}
                  alt="Preview"
                  className="w-full aspect-[16/9] object-cover rounded-xl"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 min-h-[100px] overflow-hidden">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {safeSection.title || "Preview"}
                  </h3>
                  <p className="text-base md:text-lg text-zinc-400 mt-2 line-clamp-2">
                    {safeSection.bullets?.[0] || "Highlight loading..."}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 shadow"
              >
                <p className="text-2xl font-bold text-green-400">{s.value}{s.suffix}</p>
                <p className="text-sm text-zinc-300 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <h2 className="text-3xl font-bold mb-8 text-center">Who's viewing?</h2>
          <div className="flex justify-center gap-10 flex-wrap mt-6">
            {profiles.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer text-center"
                onClick={() => setSelectedProfile(p)}
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="rounded-full w-20 h-20 object-cover border-4 border-red-600 mb-3 transition-transform duration-300 hover:scale-105"
                />
                <p className="text-white text-sm font-semibold">{p.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6"
        >
          <Button onClick={() => setSelectedProfile(null)} className="mb-6 bg-red-600">
            ← Back to Profiles
          </Button>
          <img
            src={selectedProfile.section?.image || "https://via.placeholder.com/800x200.png?text=Section+Image"}
            alt={selectedProfile.section?.title || "Section"}
            className="w-full max-h-[350px] object-cover rounded-xl mb-6"
          />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-white">
            {selectedProfile.section?.title || "Untitled Section"}
          </h2>
          <ul className="text-left max-w-3xl mx-auto list-disc list-inside text-zinc-300 text-base md:text-lg mb-6">
            {selectedProfile.section?.bullets?.map((item, i) => (
              <li key={i}>{item}</li>
            )) || <li>No highlights available.</li>}
          </ul>

          {selectedProfile.id === 'experience' && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-3">🔧 Tools & Systems Used</h3>
              <div className="flex gap-4 overflow-x-auto carousel-scroll pb-2">
                {["SelectPay", "Excel", "Power Automate", "Indeed", "LinkedIn", "Right to Work", "DBS", "CarePlanner"].map((tool, index) => (
                  <div key={index} className="min-w-[140px] bg-zinc-800 p-3 rounded-lg text-sm text-center border border-zinc-600">
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedProfile.section?.actions && (
            <div className="text-center space-x-4">
              {selectedProfile.section.actions.map((a, idx) => (
                <a
                  key={idx}
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-green-600 hover:bg-green-700">{a.label}</Button>
                </a>
              ))}
            </div>
          )}

          {selectedProfile && selectedProfile.id === 'summary' && (
            <div className="mt-10 text-center">
              <h3 className="text-xl font-bold text-white mb-4">📄 View Full CV</h3>
              <div className="max-w-4xl mx-auto">
                <iframe
                  src="https://drive.google.com/file/d/1HT42BiX8WZpITpQtL9lGqbyLOom8mk4C/preview"
                  className="w-full h-[600px] border border-zinc-700 rounded-md"
                  frameBorder="0"
                  title="CV Preview"
                ></iframe>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
