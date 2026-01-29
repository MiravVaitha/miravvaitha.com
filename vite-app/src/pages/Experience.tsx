import { Link } from "react-router-dom"
import { ExternalLink, FileText, Github, Instagram, ArrowRight } from "lucide-react"
import GlassCard from "@/components/ui/glass-card"

export default function Experience() {
    const workExperience = [
        {
            date: "Jan 2026 - Present",
            title: "AI Software Developer",
            company: "Metfolio",
            href: "https://www.metfolio.com/",
            description: "Currently working as part of a development team on a production mobile application. My work spans frontend and backend development as well as automated testing, with a focus on building features that are reliable, maintainable, and suitable for real-world use.",
        },
        {
            date: "Feb - Aug 2023, Jul - Sept 2025",
            title: "Software Engineering Intern",
            company: "Capventis",
            href: "https://www.capventis.com/glu",
            description: "Contributed to the development and testing of an in-house business software platform across two internship periods. Worked on feature development, wrote UI automation tests using JavaScript, supported end-to-end testing, and analysed large client datasets to assist with reporting and client-facing deliverables.",
        },
        {
            date: "Jul - Aug 2022",
            title: "Retail Assistant",
            company: "Purejewels",
            href: "https://www.purejewels.com/",
            description: "Worked in a high-value retail environment, providing customer service and supporting daily operations. Developed strong communication skills, attention to detail, and experience working responsibly in a customer-facing role.",
        },
    ]

    const projects = [
        {
            title: "Kroccustoms",
            subtitle: "Shopify, Web Design, E-commerce",
            description: "Co-founded and operated a custom clothing brand, taking responsibility for building and maintaining the Shopify e-commerce website. Worked across branding, marketing, sales, and basic financial management, gaining hands-on experience with running a small online business end-to-end.",
            actions: [
                { label: "Instagram", href: "https://www.instagram.com/kroccustoms/", icon: <Instagram className="w-4 h-4" /> },
            ],
        },
        {
            title: "Remote-Controlled Vehicle",
            subtitle: "Onshape, Hardware Integration, Javascript",
            description: "Designed, built, and programmed a remote-controlled vehicle as a personal engineering project. Integrated hardware and software components, focusing on system behaviour, control logic, and reliable operation.",
            actions: [
                { label: "Read report", href: "/docs/tech-project-portfolio.pdf", icon: <FileText className="w-4 h-4" /> },
                { label: "See media", href: "https://drive.google.com/drive/folders/16Mwq8ZMVIVF9qnfC1pUEB7J8RXV1SsP9?usp=sharing", icon: <ExternalLink className="w-4 h-4" /> },
            ],
        },
        {
            title: "Line-Following Autonomous Vehicle",
            subtitle: "Micro:bit, Embedded Systems, Onshape, Electronics",
            description: "Designed and built an autonomous line-following vehicle using a Micro:bit. Created custom components using CAD and digital fabrication, built and soldered the circuit, and programmed sensor-based motor control using light-dependent resistors. Iteratively tested and refined threshold values to improve accuracy and reliability on track bends.",
            actions: [
                { label: "Read report", href: "/docs/line-follower-project.pdf", icon: <FileText className="w-4 h-4" /> },
            ],
        },
        {
            title: "Personal Portfolio Website",
            subtitle: "React, TypeScript, Vite, Tailwind CSS, Git, GitHub",
            description: "Modernized and migrated my personal portfolio from a legacy static site to a high-performance React + TypeScript application. Implemented modern UI/UX principles with Tailwind CSS, custom glassmorphism, and framer-motion animations, ensuring structural clarity and maintainable code.",
            actions: [
                { label: "Source code", href: "https://github.com/MiravVaitha/MiravVaitha.github.io", icon: <Github className="w-4 h-4" /> },
            ],
        },
    ]

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Work Experience Section */}
            <section className="space-y-6">
                <h2 className="text-3xl font-bold text-white border-b border-white/10 pb-2">Work Experience</h2>
                <div className="space-y-4">
                    {workExperience.map((exp) => (
                        <GlassCard
                            key={exp.company}
                            href={exp.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                        {exp.title}
                                    </h3>
                                    <p className="text-indigo-300 font-medium">{exp.company}</p>
                                </div>
                                <span className="text-sm font-medium text-white/40 uppercase tracking-wider">
                                    {exp.date}
                                </span>
                            </div>
                            <p className="text-white/70 text-sm md:text-base leading-relaxed">
                                {exp.description}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section className="space-y-6">
                <h2 className="text-3xl font-bold text-white border-b border-white/10 pb-2">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <GlassCard
                            key={project.title}
                            className="flex flex-col h-full"
                        >
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                                <p className="text-xs font-semibold text-indigo-300/80 uppercase tracking-wide">
                                    {project.subtitle}
                                </p>
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed mb-6 flex-grow">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                                {project.actions.map((action) => (
                                    <a
                                        key={action.label}
                                        href={action.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs font-bold text-white/50 hover:text-white transition-colors uppercase tracking-widest"
                                    >
                                        {action.icon}
                                        <span>{action.label}</span>
                                    </a>
                                ))}
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </section>

            {/* Footer CTA */}
            <div className="flex justify-center pt-8 border-t border-white/10">
                <Link
                    to="/education"
                    className="group inline-flex items-center gap-2 text-white/60 hover:text-white transition-all font-medium"
                >
                    <span>See my academic background</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    )
}
