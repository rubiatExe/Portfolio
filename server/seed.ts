import { storage } from "./storage";
import type { InsertProfile, InsertSkill, InsertProject } from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Seed profile
  const profileData: InsertProfile = {
    name: "Alex Developer",
    role: "Full-Stack Developer",
    monthlyListeners: "3,245,678",
    bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture. Always learning, always coding.",
    education: "B.S. Computer Science, Stanford University",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer",
  };

  try {
    await storage.updateProfile(profileData);
    console.log("✓ Profile seeded");
  } catch (error) {
    console.error("Error seeding profile:", error);
  }

  // Seed skills
  const skillsData: InsertSkill[] = [
    { name: "React.js", proficiency: "Expert", experience: "5 yrs", order: 0 },
    { name: "TypeScript", proficiency: "Expert", experience: "4 yrs", order: 1 },
    { name: "Node.js", proficiency: "Advanced", experience: "5 yrs", order: 2 },
    { name: "Python", proficiency: "Advanced", experience: "4 yrs", order: 3 },
    { name: "PostgreSQL", proficiency: "Advanced", experience: "3 yrs", order: 4 },
    { name: "AWS/Cloud", proficiency: "Intermediate", experience: "3 yrs", order: 5 },
    { name: "Docker/K8s", proficiency: "Intermediate", experience: "2 yrs", order: 6 },
    { name: "GraphQL", proficiency: "Advanced", experience: "3 yrs", order: 7 },
  ];

  try {
    for (const skill of skillsData) {
      await storage.createSkill(skill);
    }
    console.log(`✓ Seeded ${skillsData.length} skills`);
  } catch (error) {
    console.error("Error seeding skills:", error);
  }

  // Seed projects
  const projectsData: InsertProject[] = [
    {
      title: "E-Commerce Platform",
      subtitle: "React · Node.js · PostgreSQL · 2024",
      gradient: "from-blue-600 to-blue-800",
      link: "https://github.com",
      order: 0,
    },
    {
      title: "Real-time Analytics Dashboard",
      subtitle: "Next.js · WebSockets · Redis · 2024",
      gradient: "from-purple-600 to-purple-800",
      link: "https://github.com",
      order: 1,
    },
    {
      title: "AI Content Generator",
      subtitle: "Python · OpenAI · FastAPI · 2023",
      gradient: "from-green-600 to-green-800",
      link: "https://github.com",
      order: 2,
    },
    {
      title: "Mobile Fitness Tracker",
      subtitle: "React Native · Firebase · 2023",
      gradient: "from-red-600 to-red-800",
      link: "https://github.com",
      order: 3,
    },
    {
      title: "SaaS Starter Kit",
      subtitle: "Next.js · Stripe · Prisma · 2023",
      gradient: "from-yellow-600 to-yellow-800",
      link: "https://github.com",
      order: 4,
    },
    {
      title: "DevOps Automation Tool",
      subtitle: "Go · Docker · Kubernetes · 2022",
      gradient: "from-indigo-600 to-indigo-800",
      link: "https://github.com",
      order: 5,
    },
  ];

  try {
    for (const project of projectsData) {
      await storage.createProject(project);
    }
    console.log(`✓ Seeded ${projectsData.length} projects`);
  } catch (error) {
    console.error("Error seeding projects:", error);
  }

  console.log("✅ Database seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Fatal error during seeding:", error);
  process.exit(1);
});
