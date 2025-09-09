import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  UserPlus, 
  Calendar, 
  FileText, 
  Download, 
  Settings, 
  CheckCircle,
  Clock
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  department: string;
  year: string;
  semester: string;
  bloodGroup: string;
  phone: string;
  email: string;
  parentPhone?: string;
  address: string;
  attendance: number;
}

const Dashboard = () => {
  const [context, setContext] = useState({ department: "", year: "", semester: "" });
  const [students, setStudents] = useState<Student[]>([]);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    bloodGroup: "",
    phone: "",
    email: "",
    parentPhone: "",
    address: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedContext = localStorage.getItem("selectedContext");
    if (savedContext) {
      setContext(JSON.parse(savedContext));
    }
  }, []);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const student: Student = {
      id: Date.now().toString(),
      ...newStudent,
      department: context.department,
      year: context.year,
      semester: context.semester,
      attendance: 0
    };

    setStudents([...students, student]);
    setNewStudent({
      name: "",
      bloodGroup: "",
      phone: "",
      email: "",
      parentPhone: "",
      address: ""
    });
    setShowAddStudent(false);
    
    toast({
      title: "Student Added",
      description: `${newStudent.name} has been added successfully`,
    });
  };

  const handleExportAttendance = (format: 'excel' | 'pdf') => {
    toast({
      title: `Export ${format.toUpperCase()}`,
      description: "Attendance report will be downloaded shortly",
    });
  };

  const handleMarkAttendance = () => {
    toast({
      title: "Attendance Marked",
      description: "Today's attendance has been recorded",
    });
  };

  const quickStats = [
    {
      title: "Total Students",
      value: students.length.toString().padStart(2, '0'),
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Present Today",
      value: Math.floor(students.length * 0.85).toString().padStart(2, '0'),
      icon: CheckCircle,
      color: "text-accent"
    },
    {
      title: "Average Attendance",
      value: "87%",
      icon: Clock,
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                {context.department} - Year {context.year} - Semester {context.semester}
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className={`text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="shadow-card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowAddStudent(true)}>
            <CardHeader className="text-center pb-4">
              <UserPlus className="w-12 h-12 mx-auto text-accent mb-2" />
              <CardTitle className="text-lg">Add Student</CardTitle>
              <CardDescription>Register new student</CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card cursor-pointer hover:shadow-lg transition-shadow" onClick={handleMarkAttendance}>
            <CardHeader className="text-center pb-4">
              <Calendar className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Mark Attendance</CardTitle>
              <CardDescription>Today's attendance</CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <FileText className="w-12 h-12 mx-auto text-accent mb-2" />
              <CardTitle className="text-lg">View Reports</CardTitle>
              <CardDescription>Analytics & reports</CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <Users className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Manage Students</CardTitle>
              <CardDescription>Edit student data</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Students List */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Student Records</CardTitle>
                <CardDescription>
                  {students.length} students enrolled in this semester
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExportAttendance('excel')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Excel
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExportAttendance('pdf')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {students.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No students enrolled yet</p>
                <Button 
                  className="mt-4 bg-accent hover:bg-accent-hover text-accent-foreground"
                  onClick={() => setShowAddStudent(true)}
                >
                  Add First Student
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{student.phone}</p>
                      <p className="text-sm text-muted-foreground">Blood: {student.bloodGroup}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Student Dialog */}
        <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Enter student information for {context.department} Year {context.year} Semester {context.semester}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Student Name *</Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  placeholder="student@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select value={newStudent.bloodGroup} onValueChange={(value) => setNewStudent({...newStudent, bloodGroup: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="parentPhone">Parent Phone (Optional)</Label>
                <Input
                  id="parentPhone"
                  value={newStudent.parentPhone}
                  onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
                  placeholder="Parent phone number"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newStudent.address}
                  onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                  placeholder="Enter address"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddStudent(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddStudent}
                className="bg-accent hover:bg-accent-hover text-accent-foreground"
              >
                Add Student
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;