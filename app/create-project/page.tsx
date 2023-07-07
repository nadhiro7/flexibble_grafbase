import { redirect } from "next/navigation";

import { GetCurrentSession } from "@/lib/session";
import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";

const CreateProject = async () => {
  const session = await GetCurrentSession();

  if (!session?.user) redirect("/")

  return (
    <Modal>
      <h3 className="modal-head-text">Create a New Project</h3>

      <ProjectForm type="create" session={session} />
    </Modal>
  );
};

export default CreateProject;
