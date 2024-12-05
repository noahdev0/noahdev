import ProjectViewPage from "../../[...projectId]/page";

export default function ProjectDetailPage({ params }) {
  return <ProjectViewPage projectId={params.id} />;
}
