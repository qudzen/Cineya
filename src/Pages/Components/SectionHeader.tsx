interface SectionHeaderProps {
    title: string;
    subtitle?: string;
}

export default function SectionHeader({title, subtitle}: SectionHeaderProps) {
    return (
        <div className="px-4 lg:px-12">
            <div className="flex items-start gap-4">
                <div className="mt-1 hidden h-10 w-1 shrink-0 rounded-full bg-yellow-400 sm:block"/>
                <div>
                    <h2 className="text-xl font-bold text-white md:text-4xl lg:text-5xl">{title}</h2>
                    {subtitle && (
                        <p className="mt-2 text-sm font-light uppercase tracking-widest text-white/40">{subtitle}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
