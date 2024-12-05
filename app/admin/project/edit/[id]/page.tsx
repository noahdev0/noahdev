import ProjectForm from "@/components/projuctForm";
import { getProjectById } from "@/lib/actions/project-action";

export default async function EditProjectPage({ params }) {
  const project = await getProjectById(params.id);

  return <ProjectForm initialProject={project} />;
}
