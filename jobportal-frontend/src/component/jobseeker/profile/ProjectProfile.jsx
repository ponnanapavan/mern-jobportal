import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const ProjectProfile = () => {
  const [project, setProject] = useState([]);

  useEffect(() => {
    async function getUserData() {
      try {
        const apiResponse = await fetch("/api/v1/user/userProfile", {
          method: "GET",
        });
        const result = await apiResponse.json();
        setProject(result.jobseeker.projects);
      } catch (err) {
        console.error(err.message);
      }
    }
    getUserData();
  }, []);

  const [isProjectOpen, setIsProjectOpen] = useState(true);

  const router=useNavigate();

  if(!isProjectOpen)
    router('/dashboard')

  return (
    <Dialog open={isProjectOpen} onOpenChange={() => setIsProjectOpen(false)}>
      <DialogContent className="sm:max-w-[800px]"> {/* Increased the width */}
        <DialogHeader>
          <DialogDescription className="text-xl font-bold mb-2">Projects 🚀🚀</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4 max-h-[400px] overflow-y-auto">
          {project && project.length > 0 ? (
            project.map((item, idx) => (
              <div
                key={idx}
                className="p-4 border border-gray-200 rounded-lg shadow-md bg-gray-50"
              >
                <div className="mb-2 text-lg font-semibold text-blue-600">
                  Project {idx + 1}: {item.projectName}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Tech Stack:</span>{" "}
                  <span className="text-gray-700">{item.projectTechStack}</span>
                </div>
                <div className="mb-2">
                  <span className="font-bold">Description:</span>{" "}
                  <span className="text-gray-700 whitespace-pre-wrap">{item.projectDescription}</span>
                </div>
                <div className="mb-2">
                  <span className="font-bold">Start Date:</span>{" "}
                  <span className="text-gray-700">{item.startDate}</span>
                </div>
                <div className="mb-2">
                  <span className="font-bold">End Date:</span>{" "}
                  <span className="text-gray-700">{item.endDate}</span>
                </div>
                <div className="mb-2">
                  <a
                    href={item.projectLink}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    Project Link
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div>No projects available</div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => setIsProjectOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectProfile;
