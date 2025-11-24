import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";
import type {
  User,
  InsertUser,
  Profile,
  InsertProfile,
  Skill,
  InsertSkill,
  Project,
  InsertProject,
  BlogPost,
  InsertBlogPost,
  ContactSubmission,
  InsertContact,
  PageView,
  InsertPageView,
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Profile methods
  getProfile(): Promise<Profile | undefined>;
  updateProfile(profile: InsertProfile): Promise<Profile>;

  // Skills methods
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill>;
  deleteSkill(id: number): Promise<void>;
  clearSkills(): Promise<void>;

  // Projects methods
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;
  clearProjects(): Promise<void>;

  // Blog methods
  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;

  // Contact methods
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;

  // Analytics methods
  createPageView(view: InsertPageView): Promise<PageView>;
  getPageViews(startDate?: Date, endDate?: Date): Promise<PageView[]>;
}

const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
});

const db = drizzle(pool, { schema });

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(schema.users).values(user).returning();
    return result[0];
  }

  // Profile methods
  async getProfile(): Promise<Profile | undefined> {
    const result = await db.select().from(schema.profile).limit(1);
    return result[0];
  }

  async updateProfile(profileData: InsertProfile): Promise<Profile> {
    const existing = await this.getProfile();
    if (existing) {
      const result = await db
        .update(schema.profile)
        .set({ ...profileData, updatedAt: new Date() })
        .where(eq(schema.profile.id, existing.id))
        .returning();
      return result[0];
    } else {
      const result = await db.insert(schema.profile).values(profileData).returning();
      return result[0];
    }
  }

  // Skills methods
  async getSkills(): Promise<Skill[]> {
    return db.select().from(schema.skills).orderBy(schema.skills.order);
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const result = await db.insert(schema.skills).values(skill).returning();
    return result[0];
  }

  async updateSkill(id: number, skillData: Partial<InsertSkill>): Promise<Skill> {
    const result = await db
      .update(schema.skills)
      .set(skillData)
      .where(eq(schema.skills.id, id))
      .returning();
    return result[0];
  }

  async deleteSkill(id: number): Promise<void> {
    await db.delete(schema.skills).where(eq(schema.skills.id, id));
  }

  async clearSkills(): Promise<void> {
    await db.delete(schema.skills);
  }

  // Projects methods
  async getProjects(): Promise<Project[]> {
    return db.select().from(schema.projects).orderBy(schema.projects.order);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const result = await db.insert(schema.projects).values(project).returning();
    return result[0];
  }

  async updateProject(id: number, projectData: Partial<InsertProject>): Promise<Project> {
    const result = await db
      .update(schema.projects)
      .set(projectData)
      .where(eq(schema.projects.id, id))
      .returning();
    return result[0];
  }

  async deleteProject(id: number): Promise<void> {
    await db.delete(schema.projects).where(eq(schema.projects.id, id));
  }

  async clearProjects(): Promise<void> {
    await db.delete(schema.projects);
  }

  // Blog methods
  async getBlogPosts(publishedOnly = false): Promise<BlogPost[]> {
    if (publishedOnly) {
      return db
        .select()
        .from(schema.blogPosts)
        .where(eq(schema.blogPosts.published, true))
        .orderBy(desc(schema.blogPosts.createdAt));
    }
    return db.select().from(schema.blogPosts).orderBy(desc(schema.blogPosts.createdAt));
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const result = await db.select().from(schema.blogPosts).where(eq(schema.blogPosts.id, id));
    return result[0];
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const result = await db.insert(schema.blogPosts).values(post).returning();
    return result[0];
  }

  async updateBlogPost(id: number, postData: Partial<InsertBlogPost>): Promise<BlogPost> {
    const result = await db
      .update(schema.blogPosts)
      .set({ ...postData, updatedAt: new Date() })
      .where(eq(schema.blogPosts.id, id))
      .returning();
    return result[0];
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(schema.blogPosts).where(eq(schema.blogPosts.id, id));
  }

  // Contact methods
  async createContactSubmission(contact: InsertContact): Promise<ContactSubmission> {
    const result = await db.insert(schema.contactSubmissions).values(contact).returning();
    return result[0];
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(schema.contactSubmissions).orderBy(desc(schema.contactSubmissions.submittedAt));
  }

  // Analytics methods
  async createPageView(view: InsertPageView): Promise<PageView> {
    const result = await db.insert(schema.pageViews).values(view).returning();
    return result[0];
  }

  async getPageViews(startDate?: Date, endDate?: Date): Promise<PageView[]> {
    return db.select().from(schema.pageViews).orderBy(desc(schema.pageViews.timestamp));
  }
}

export const storage = new DbStorage();
