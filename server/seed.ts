import { storage } from "./storage";
import type { InsertProfile, InsertSkill, InsertProject } from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Seed profile
  const profileData: InsertProfile = {
    name: "Rubiat Bin Faisal",
    role: "Software Engineer",
    monthlyListeners: "500,000+", // Artistic license for "views/impact"
    bio: "Results-driven Software Engineer with experience in leading small teams and shipping end-to-end products in startup environments. Specialized in Full-Stack Development, React, Node.js, and Python.",
    education: "Bachelor’s in Computer Science, Lehigh University",
    githubUrl: "https://github.com/rubiatExe",
    linkedinUrl: "https://www.linkedin.com/in/rubiat-bin-faisal/",
    avatarUrl: "/profile_cartoon.png",
  };

  try {
    await storage.updateProfile(profileData);
    console.log("✓ Profile seeded");
  } catch (error) {
    console.error("Error seeding profile:", error);
  }

  // Clear and Seed skills
  const skillsData: InsertSkill[] = [
    { name: "TypeScript", proficiency: "Expert", experience: "3 yrs", order: 0 },
    { name: "JavaScript", proficiency: "Expert", experience: "4 yrs", order: 1 },
    { name: "ReactJS", proficiency: "Expert", experience: "3 yrs", order: 2 },
    { name: "Node.js", proficiency: "Advanced", experience: "3 yrs", order: 3 },
    { name: "Python", proficiency: "Advanced", experience: "3 yrs", order: 4 },
    { name: "Next.js", proficiency: "Advanced", experience: "2 yrs", order: 5 },
    { name: "SQL/PostgreSQL", proficiency: "Intermediate", experience: "2 yrs", order: 6 },
    { name: "AWS", proficiency: "Intermediate", experience: "1 yr", order: 7 },
  ];

  try {
    await storage.clearSkills();
    console.log("✓ Cleared existing skills");
    for (const skill of skillsData) {
      await storage.createSkill(skill);
    }
    console.log(`✓ Seeded ${skillsData.length} skills`);
  } catch (error) {
    console.error("Error seeding skills:", error);
  }

  // Clear and Seed projects
  const projectsData: InsertProject[] = [
    {
      title: "Managii",
      subtitle: "Next.js · TypeScript · PostgreSQL · AI · Tailwind CSS",
      gradient: "from-blue-600 to-cyan-600",
      imageUrl: "/project_managify.png",
      link: "https://github.com/rubiatExe/Managii",
      order: 0,
    },
    {
      title: "WanderWise",
      subtitle: "Next.js · TypeScript · Google Cloud · Machine Learning",
      gradient: "from-green-600 to-emerald-600",
      imageUrl: "/project_wanderwise.png",
      link: "https://github.com/rubiatExe/WanderWise",
      order: 1,
    },
    {
      title: "Mentessa Integration",
      subtitle: "React · Slack API · OpenAI GPT-3.5",
      gradient: "from-purple-600 to-pink-600",
      imageUrl: "/project_mentessa.png",
      link: "https://www.mentessa.com",
      order: 2,
    },
    {
      title: "Save Tuba",
      subtitle: "Android · Java · RESTful APIs",
      gradient: "from-orange-600 to-amber-600",
      imageUrl: "/project_savetuba.png",
      link: "#",
      order: 3,
    },
  ];

  try {
    await storage.clearProjects();
    console.log("✓ Cleared existing projects");
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
