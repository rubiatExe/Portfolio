import { storage } from "./storage";
import type { InsertProfile, InsertSkill, InsertProject } from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Seed profile
  const profileData: InsertProfile = {
    name: "Rubiat Bin Faisal",
    role: "Associate Product Manager",
    monthlyListeners: "500,000+", // Artistic license for "views/impact"
    bio: "Product-minded builder with a strong technical foundation. Experienced in leading cross-functional teams, defining product roadmaps, and shipping user-centric solutions in fast-paced startup environments. Passionate about leveraging AI to solve real-world problems and drive measurable business outcomes.",
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
    { name: "Product Strategy", proficiency: "Advanced", experience: "2 yrs", order: 0 },
    { name: "Data Analysis", proficiency: "Advanced", experience: "3 yrs", order: 1 },
    { name: "Agile/Scrum", proficiency: "Expert", experience: "3 yrs", order: 2 },
    { name: "User Research", proficiency: "Advanced", experience: "2 yrs", order: 3 },
    { name: "SQL/Analytics", proficiency: "Advanced", experience: "2 yrs", order: 4 },
    { name: "Python", proficiency: "Advanced", experience: "3 yrs", order: 5 },
    { name: "Technical Writing", proficiency: "Expert", experience: "3 yrs", order: 6 },
    { name: "A/B Testing", proficiency: "Intermediate", experience: "1 yr", order: 7 },
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
      title: "TeamFlow",
      subtitle: "AI-Powered Hiring Platform · Product Strategy · UX Design",
      gradient: "from-emerald-500 to-teal-600",
      imageUrl: "/project_teamflow.png",
      link: "https://github.com/rubiatExe/TeamFlow",
      order: 0,
    },
    {
      title: "Managii",
      subtitle: "AI Project Management · Roadmap Visualization · Team Analytics",
      gradient: "from-blue-600 to-cyan-600",
      imageUrl: "/project_managify.png",
      link: "https://github.com/rubiatExe/Managii",
      order: 1,
    },
    {
      title: "WanderWise",
      subtitle: "Travel Optimization · ML-Driven Recommendations · User Research",
      gradient: "from-green-600 to-emerald-600",
      imageUrl: "/project_wanderwise.png",
      link: "https://github.com/rubiatExe/WanderWise",
      order: 2,
    },
    {
      title: "Mentessa Integration",
      subtitle: "Enterprise SaaS · Slack Integration · AI Mentorship Matching",
      gradient: "from-purple-600 to-pink-600",
      imageUrl: "/project_mentessa.png",
      link: "https://www.mentessa.com",
      order: 3,
    },
    {
      title: "Save Tuba",
      subtitle: "Mobile App · User Engagement · Gamification Strategy",
      gradient: "from-orange-600 to-amber-600",
      imageUrl: "/project_savetuba.png",
      link: "#",
      order: 4,
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
