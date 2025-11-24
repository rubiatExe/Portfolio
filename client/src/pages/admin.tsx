import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Settings, Plus, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Profile, Skill, Project, InsertSkill, InsertProject, InsertProfile } from "@shared/schema";

export default function Admin() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  // Fetch data
  const { data: profile } = useQuery<Profile>({ queryKey: ["/api/profile"] });
  const { data: skills = [] } = useQuery<Skill[]>({ queryKey: ["/api/skills"] });
  const { data: projects = [] } = useQuery<Project[]>({ queryKey: ["/api/projects"] });

  // Profile state
  const [profileForm, setProfileForm] = useState<Partial<InsertProfile>>({});

  // Update profile
  const updateProfileMutation = useMutation({
    mutationFn: (data: InsertProfile) => apiRequest("PUT", "/api/profile", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({ title: "Profile updated successfully!" });
    },
  });

  // Delete skill
  const deleteSkillMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/skills/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
      toast({ title: "Skill deleted" });
    },
  });

  // Delete project
  const deleteProjectMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/projects/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project deleted" });
    },
  });

  const handleProfileSubmit = () => {
    const data = { ...profile, ...profileForm } as InsertProfile;
    updateProfileMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-black">Portfolio Admin</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card">
            <TabsTrigger value="profile" data-testid="tab-profile">Profile</TabsTrigger>
            <TabsTrigger value="skills" data-testid="tab-skills">Skills</TabsTrigger>
            <TabsTrigger value="projects" data-testid="tab-projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card className="p-6 bg-card">
              <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    defaultValue={profile?.name}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-background"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    defaultValue={profile?.role}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, role: e.target.value }))}
                    className="bg-background"
                    data-testid="input-role"
                  />
                </div>
                <div>
                  <Label htmlFor="listeners">Monthly Listeners</Label>
                  <Input
                    id="listeners"
                    defaultValue={profile?.monthlyListeners}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, monthlyListeners: e.target.value }))}
                    className="bg-background"
                    data-testid="input-listeners"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue={profile?.bio}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                    className="bg-background min-h-[100px]"
                    data-testid="textarea-bio"
                  />
                </div>
                <div>
                  <Label htmlFor="education">Education</Label>
                  <Input
                    id="education"
                    defaultValue={profile?.education}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, education: e.target.value }))}
                    className="bg-background"
                    data-testid="input-education"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input
                      id="github"
                      defaultValue={profile?.githubUrl}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                      className="bg-background"
                      data-testid="input-github"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      defaultValue={profile?.linkedinUrl}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                      className="bg-background"
                      data-testid="input-linkedin"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    defaultValue={profile?.avatarUrl}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, avatarUrl: e.target.value }))}
                    className="bg-background"
                    data-testid="input-avatar"
                  />
                </div>
                <Button
                  onClick={handleProfileSubmit}
                  disabled={updateProfileMutation.isPending}
                  className="w-full bg-primary hover:bg-primary/90"
                  data-testid="button-save-profile"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updateProfileMutation.isPending ? "Saving..." : "Save Profile"}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <Card className="p-6 bg-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Skills</h2>
                <Button size="sm" className="bg-primary" data-testid="button-add-skill">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </div>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-4 bg-background rounded-md" data-testid={`skill-item-${skill.id}`}>
                    <div className="flex-1">
                      <p className="font-bold">{skill.name}</p>
                      <p className="text-sm text-muted-foreground">{skill.proficiency} · {skill.experience}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteSkillMutation.mutate(skill.id)}
                      disabled={deleteSkillMutation.isPending}
                      data-testid={`button-delete-skill-${skill.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <Card className="p-6 bg-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Projects</h2>
                <Button size="sm" className="bg-primary" data-testid="button-add-project">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 bg-background rounded-md" data-testid={`project-item-${project.id}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-12 h-12 rounded bg-gradient-to-br ${project.gradient}`} />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteProjectMutation.mutate(project.id)}
                        disabled={deleteProjectMutation.isPending}
                        data-testid={`button-delete-project-${project.id}`}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <p className="font-bold">{project.title}</p>
                    <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
