import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { Project } from "@shared/schema";

export default function Projects() {
    const [, setLocation] = useLocation();
    const { data: projects = [] } = useQuery<Project[]>({
        queryKey: ["/api/projects"],
    });

    return (
        <div className="flex flex-col h-[100dvh] w-full bg-black">
            {/* Header */}
            <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-sidebar border-b border-sidebar-border">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setLocation("/")}
                        className="text-foreground hover:text-foreground"
                        data-testid="button-back"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-foreground">Projects</h1>
                        <p className="text-sm text-muted-foreground">Featured work & portfolio</p>
                    </div>
                </div>
            </header>

            {/* Projects Grid */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                data-testid={`project-${index}`}
                            >
                                <Card className="group bg-card p-3 md:p-4 rounded-lg transition-all duration-300 hover:bg-card-hover cursor-pointer">
                                    <div className="relative mb-3 md:mb-4 overflow-visible">
                                        {project.imageUrl ? (
                                            <img
                                                src={project.imageUrl}
                                                alt={project.title}
                                                className="aspect-square rounded-md object-cover shadow-lg w-full"
                                            />
                                        ) : (
                                            <div className={`aspect-square rounded-md bg-gradient-to-br ${project.gradient} shadow-lg`} />
                                        )}
                                        <div className="absolute bottom-2 right-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            <Button
                                                size="icon"
                                                className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-primary shadow-xl hover:scale-110 transition-transform"
                                                data-testid={`button-play-project-${index}`}
                                            >
                                                <Play className="w-4 h-4 md:w-5 md:h-5 fill-current ml-0.5" />
                                            </Button>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-foreground mb-1 line-clamp-1 text-sm md:text-base">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-2">
                                        {project.subtitle}
                                    </p>
                                    {project.link && project.link !== "#" && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                                            data-testid={`link-project-${index}`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            View <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
