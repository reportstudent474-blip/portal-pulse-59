import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Building, Calendar, CheckCircle } from "lucide-react";

const SelectDepartment = () => {
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const departments = [
    { value: "ECE", label: "Electronics & Communication Engineering" },
    { value: "IT", label: "Information Technology" },
    { value: "CSE", label: "Computer Science Engineering" },
    { value: "CIVIL", label: "Civil Engineering" },
    { value: "MECH", label: "Mechanical Engineering" },
    { value: "EEE", label: "Electrical & Electronics Engineering" },
  ];

  const years = [
    { value: "I", label: "First Year" },
    { value: "II", label: "Second Year" },
    { value: "III", label: "Third Year" },
    { value: "IV", label: "Fourth Year" },
  ];

  const semesters = [
    { value: "1", label: "Semester 1" },
    { value: "2", label: "Semester 2" },
    { value: "3", label: "Semester 3" },
    { value: "4", label: "Semester 4" },
    { value: "5", label: "Semester 5" },
    { value: "6", label: "Semester 6" },
    { value: "7", label: "Semester 7" },
    { value: "8", label: "Semester 8" },
  ];

  const handleDone = () => {
    if (!department || !year || !semester) {
      toast({
        title: "Selection Required",
        description: "Please select department, year, and semester",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("selectedContext", JSON.stringify({
      department,
      year,
      semester
    }));

    toast({
      title: "Selection Complete",
      description: `Accessing ${department} Year ${year} Semester ${semester} dashboard`,
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Select Academic Context
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose the department, year, and semester to manage
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <Building className="w-12 h-12 mx-auto text-accent mb-2" />
              <CardTitle>Department</CardTitle>
              <CardDescription>Select the engineering department</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="shadow-input">
                  <SelectValue placeholder="Choose Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="text-center">
              <GraduationCap className="w-12 h-12 mx-auto text-accent mb-2" />
              <CardTitle>Academic Year</CardTitle>
              <CardDescription>Select the year of study</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="shadow-input">
                  <SelectValue placeholder="Choose Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((yr) => (
                    <SelectItem key={yr.value} value={yr.value}>
                      {yr.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="text-center">
              <Calendar className="w-12 h-12 mx-auto text-accent mb-2" />
              <CardTitle>Semester</CardTitle>
              <CardDescription>Select the semester</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger className="shadow-input">
                  <SelectValue placeholder="Choose Semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((sem) => (
                    <SelectItem key={sem.value} value={sem.value}>
                      {sem.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {department && year && semester && (
          <Card className="mt-8 shadow-card bg-accent/5 border-accent/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 mx-auto text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Selection Summary</h3>
                <p className="text-muted-foreground mb-4">
                  You have selected: <span className="font-medium text-foreground">
                    {departments.find(d => d.value === department)?.label} - 
                    Year {year} - Semester {semester}
                  </span>
                </p>
                <Button 
                  onClick={handleDone}
                  className="bg-accent hover:bg-accent-hover text-accent-foreground shadow-button px-8"
                >
                  Access Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SelectDepartment;