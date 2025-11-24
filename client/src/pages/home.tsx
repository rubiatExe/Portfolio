import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Home as HomeIcon,
  Search,
  Library,
  Github,
  Linkedin,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  BadgeCheck,
  Heart,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Profile, Skill, Project } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(7, 7, 7, 0)", "rgb(7, 7, 7)"]
  );

  // Initialize audio and attempt autoplay
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;

      // Set start time once audio metadata is loaded
      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          audioRef.current.currentTime = 35; // Start at 35 seconds
        }
      };

      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

      // Attempt to autoplay - browsers require user interaction
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay was prevented, user needs to click play
            setIsPlaying(false);
          });
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
      };
    }
  }, []);

  // Handle play/pause toggle
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // If at the beginning, start at 35 seconds
        if (audioRef.current.currentTime < 1) {
          audioRef.current.currentTime = 35;
        }
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0] / 100;
    }
  };

  // Fetch portfolio data from API
  const { data: profile, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const { data: skills = [], isLoading: skillsLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Track page view for analytics
  useEffect(() => {
    apiRequest("POST", "/api/analytics/pageview", { path: "/" }).catch(() => { });
  }, []);

  const isLoading = profileLoading || skillsLoading || projectsLoading;

  if (isLoading || !profile) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-48 mx-auto bg-card" />
          <Skeleton className="h-4 w-32 mx-auto bg-card" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-black">
      {/* Left Sidebar - Hidden on mobile */}
      <aside className="hidden md:flex w-[280px] bg-sidebar flex-col p-6 gap-6">
        <div className="flex flex-col gap-4">
          <Button
            variant="ghost"
            className="justify-start gap-4 text-sidebar-foreground hover:text-sidebar-foreground h-10 px-4 font-bold"
            data-testid="nav-home"
          >
            <HomeIcon className="w-6 h-6" />
            <span className="font-bold text-base">Home</span>
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-4 text-muted-foreground hover:text-sidebar-foreground h-10 px-4"
            data-testid="nav-search"
          >
            <Search className="w-6 h-6" />
            <span className="font-bold text-base">Resume</span>
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-4 text-muted-foreground hover:text-sidebar-foreground h-10 px-4"
            data-testid="nav-library"
          >
            <Library className="w-6 h-6" />
            <span className="font-bold text-base">Projects</span>
          </Button>
        </div>

        {/* Connect Section */}
        <div className="flex-1 flex flex-col gap-2 pt-6 border-t border-sidebar-border">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-4 mb-2">
            Connect
          </h3>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-4 py-3 rounded-md hover-elevate active-elevate-2 text-sidebar-foreground transition-all duration-200"
            data-testid="link-github"
          >
            <Github className="w-5 h-5" />
            <span className="font-semibold">GitHub</span>
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-4 py-3 rounded-md hover-elevate active-elevate-2 text-sidebar-foreground transition-all duration-200"
            data-testid="link-linkedin"
          >
            <Linkedin className="w-5 h-5" />
            <span className="font-semibold">LinkedIn</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Sticky Header */}
        <motion.div
          style={{ backgroundColor: headerBg }}
          className="sticky top-0 z-40 px-4 md:px-8 py-4 backdrop-blur-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10 md:w-12 md:h-12 shadow-lg">
              <AvatarImage src={profile.avatarUrl} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold text-foreground truncate">{profile.name}</h2>
                <BadgeCheck className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero Section */}
          <section className="relative min-h-[340px] md:h-[400px] flex items-end p-4 md:p-8 bg-gradient-to-b from-indigo-900 via-purple-900 to-background">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto md:mx-0"
              >
                <Avatar className="w-40 h-40 md:w-56 md:h-56 shadow-2xl border-2 border-background/20">
                  <AvatarImage src={profile.avatarUrl} />
                  <AvatarFallback className="text-2xl md:text-4xl">{profile.name[0]}</AvatarFallback>
                </Avatar>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-1 pb-6 text-center md:text-left"
              >
                <p className="text-sm font-bold mb-3 tracking-wide">Profile</p>
                <div className="flex flex-row items-center justify-center md:justify-start gap-2 md:gap-3 mb-4">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black">{profile.name}</h1>
                  <BadgeCheck className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
                </div>
                <p className="text-sm md:text-base text-muted-foreground">
                  <span className="font-bold text-foreground">{profile.monthlyListeners}</span> monthly listeners · {profile.role}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="px-4 md:px-8 py-6 md:py-8 flex items-center justify-center md:justify-start gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="rounded-full w-14 h-14 p-0 bg-primary hover:bg-primary shadow-lg hover:shadow-xl transition-all"
                onClick={togglePlayPause}
                data-testid="button-play"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-1" />
                )}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-muted-foreground/30 text-foreground hover:text-foreground hover:border-foreground transition-all"
                data-testid="button-follow"
              >
                <Heart className="w-5 h-5 mr-2" />
                <span className="font-bold">Follow</span>
              </Button>
            </motion.div>
          </div>

          {/* Popular Section (Skills) */}
          <section className="px-4 md:px-8 py-6 md:py-8">
            <h2 className="text-2xl font-bold mb-6">Popular</h2>
            <div className="space-y-1">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto_auto] gap-2 md:gap-4 items-center px-3 md:px-4 py-3 rounded-md hover:bg-card-hover transition-colors group cursor-pointer"
                  data-testid={`skill-${index}`}
                >
                  <div className="w-6 text-right text-muted-foreground group-hover:text-foreground transition-colors text-sm md:text-base">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm md:text-base">{skill.name}</p>
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {skill.proficiency}
                  </div>
                  <div className="hidden md:block text-sm text-muted-foreground w-16 text-right group-hover:text-foreground transition-colors">
                    {skill.experience}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Discography Section (Projects) */}
          <section className="px-4 md:px-8 py-8 md:py-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Discography</h2>
              <p className="text-sm md:text-base text-muted-foreground">Featured projects and work</p>
            </div>
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
                    {project.link && (
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
          </section>

          {/* About Section */}
          <section className="px-4 md:px-8 py-8 md:py-12 pb-48 md:pb-40">
            <h2 className="text-2xl font-bold mb-6">About</h2>
            <Card className="bg-card p-6 md:p-8 rounded-lg max-w-4xl">
              <h3 className="text-lg md:text-xl font-bold mb-4">Artist Bio</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                {profile.bio}
              </p>
              <div className="pt-4 border-t border-border">
                <h4 className="font-bold mb-2 text-sm md:text-base">Education</h4>
                <p className="text-sm md:text-base text-muted-foreground">{profile.education}</p>
              </div>
            </Card>
          </section>
        </div>
      </main>

      {/* Bottom Player Bar */}
      {/* Bottom Player Bar */}
      <footer className="fixed bottom-[60px] md:bottom-0 left-0 right-0 h-[64px] md:h-[90px] bg-sidebar/95 backdrop-blur-md border-t border-sidebar-border px-3 md:px-4 flex items-center justify-between gap-4 z-50 transition-all duration-300">
        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded bg-gradient-to-br from-green-600 to-green-800 flex-shrink-0 shadow-md" />
          <div className="min-w-0">
            <p className="font-bold text-xs md:text-sm text-foreground truncate">Available for Work</p>
            <p className="text-[10px] md:text-xs text-muted-foreground truncate">Open to opportunities</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex items-center gap-3 md:gap-4 justify-end md:justify-center w-full">
            <Button
              size="icon"
              variant="ghost"
              className="w-7 h-7 md:w-8 md:h-8 text-muted-foreground hover:text-foreground hidden md:flex"
              data-testid="button-previous"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="icon"
                className="rounded-full w-8 h-8 md:w-10 md:h-10 bg-foreground hover:bg-foreground/90 text-background transition-all shadow-md"
                onClick={togglePlayPause}
                data-testid="button-player-play"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                ) : (
                  <Play className="w-4 h-4 md:w-5 md:h-5 fill-current ml-0.5" />
                )}
              </Button>
            </motion.div>
            <Button
              size="icon"
              variant="ghost"
              className="w-7 h-7 md:w-8 md:h-8 text-muted-foreground hover:text-foreground hidden md:flex"
              data-testid="button-next"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={volume}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-20 md:w-24"
            data-testid="slider-volume"
          />
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-black/95 backdrop-blur-lg border-t border-white/10 flex items-center justify-around z-50 pb-safe">
        <div className="flex flex-col items-center justify-center gap-1 text-foreground">
          <HomeIcon className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-medium">Resume</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
          <Library className="w-6 h-6" />
          <span className="text-[10px] font-medium">Projects</span>
        </div>
      </nav>

      {/* Hidden Audio Player */}
      <audio
        ref={audioRef}
        src="/Ricky_Astley_-_Never_Gonna_Give_You_Up_(mp3.pm).mp3"
        loop
        preload="auto"
      />
    </div>
  );
}
