import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';

const EducationProfile = () => {
  const [education, setEducation] = useState([]);
  const [educationOpen, setEducationOpen] = useState(true);
  const router = useNavigate();

  console.log(educationOpen)

  useEffect(() => {
    async function getUserData() {
      try {
        const apiResponse = await fetch("/api/v1/user/userProfile", {
          method: "GET",
        });
        const result = await apiResponse.json();
        setEducation(result.jobseeker.education);
      } catch (err) {
        console.error(err.message);
      }
    }
    getUserData();
  }, []);

  if (!educationOpen) {
    router('/dashboard');
  }

  return (
    <Dialog open={educationOpen} onOpenChange={() => setEducationOpen(false)}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Education Details</DialogTitle> {/* Added DialogTitle */}
          <DialogDescription className="text-xl font-bold mb-2">Education 🎓</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4 max-h-[400px] overflow-y-auto">
          {education && education.length > 0 ? (
            education.map((item, idx) => (
              <div
                key={idx}
                className="p-4 border border-gray-200 rounded-lg shadow-md bg-gray-50"
              >
                <div className="mb-2 text-lg font-semibold text-blue-600">
                  Education {idx + 1}: {item.degree} in {item.branch}
                </div>
                <div className="mb-2">
                  <span className="font-bold">College Name:</span>{" "}
                  <span className="text-gray-700">{item.CollegeName}</span>
                </div>
                <div className="mb-2">
                  <span className="font-bold">Start Date:</span>{" "}
                  <span className="text-gray-700">
                    {new Date(item.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-bold">End Date:</span>{" "}
                  <span className="text-gray-700">
                    {new Date(item.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div>No education records available</div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => setEducationOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EducationProfile;
