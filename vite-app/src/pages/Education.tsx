import { GraduationCap, Award, Languages, Code2, ExternalLink } from "lucide-react"
import GlassCard from "@/components/ui/glass-card"

export default function Education() {
    const educationTimeline = [
        {
            date: "2025 - Present",
            degree: "Bachelor of Engineering",
            institution: "Trinity College Dublin",
            href: "https://www.tcd.ie/engineering/",
            linkLabel: "tcd.ie",
            description: "Pursuing engineering at one of Ireland’s top universities, building a strong foundation in core engineering principles.",
        },
        {
            date: "2019 - 2025",
            degree: "Junior cert, Leaving cert",
            institution: "The Kings Hospital Secondary School, Dublin",
            href: "https://kingshospital.ie/",
            linkLabel: "kingshospital.ie",
            description: "Achieved an exceptional result of 578 points in the leaving cert.",
        },
    ]

    const achievements = [
        {
            title: "Academic Awards",
            date: "2020 - 2025",
            description: "Received excellence awards for outstanding exam results for 5 consecutive years.",
        },
        {
            title: "578 points in LC",
            date: "2025",
            description: "Achieved results placing me in the top 7% of students nationally in the 2025 Leaving Certificate.",
        },
    ]

    const technicalSkills = [
        "Coded UI Testing", "Github", "AI Engineering", "Web Development", "Software Design", "Mobile App Development"
    ]

    const engineeringSkills = [
        "Hardware integration", "Electronics", "CAD (Onshape)"
    ]

    const languages = [
        "English (Native)", "Irish (Conversational)", "Gujarati (Conversational)"
    ]

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Education Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                    <GraduationCap className="w-6 h-6 text-indigo-400" />
                    <h2 className="text-3xl font-bold text-white">Education</h2>
                </div>
                <div className="space-y-4">
                    {educationTimeline.map((edu) => (
                        <GlassCard
                            key={edu.institution}
                            href={edu.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-indigo-300 font-medium">{edu.institution}</p>
                                </div>
                                <span className="text-sm font-medium text-white/40 uppercase tracking-wider">
                                    {edu.date}
                                </span>
                            </div>
                            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4">
                                {edu.description}
                            </p>
                            <div className="pt-4 border-t border-white/10">
                                <a
                                    href={edu.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-2 text-xs font-bold text-white/50 hover:text-white transition-colors uppercase tracking-widest w-fit"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>{edu.linkLabel}</span>
                                </a>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </section>

            {/* Achievements Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                    <Award className="w-6 h-6 text-indigo-400" />
                    <h2 className="text-3xl font-bold text-white">Achievements</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((item) => (
                        <GlassCard
                            key={item.title}
                            className="h-full"
                        >
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                <p className="text-xs font-semibold text-white/40 uppercase tracking-wide">
                                    {item.date}
                                </p>
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </section>

            {/* Skills & Languages Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                    <div className="flex gap-2">
                        <Code2 className="w-6 h-6 text-indigo-400" />
                        <Languages className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Skills & Languages</h2>
                </div>

                <GlassCard className="p-8 space-y-8">
                    {/* Technical Skills */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            Technical Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {technicalSkills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Engineering Skills */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            Hardware & Design
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {engineeringSkills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Languages */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            Languages
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {languages.map((lang) => (
                                <div key={lang} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm">
                                    {lang}
                                </div>
                            ))}
                        </div>
                    </div>
                </GlassCard>
            </section>
        </div>
    )
}
