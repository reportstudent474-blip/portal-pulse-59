import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Chrome } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate("/select-department");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome to the Student Portal Admin",
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/select-department`
        }
      });

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "Failed to authenticate with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/select-department`
        }
      });

      if (error) {
        toast({
          title: "Signup Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Signup Error",
        description: "Failed to sign up with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-foreground mb-2">
            Student Portal
          </h1>
          <p className="text-primary-foreground/80">
            Admin Access Dashboard
          </p>
        </div>

        <Card className="shadow-card border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-foreground">Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the student management system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow-input"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full shadow-button bg-primary hover:bg-primary-hover"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full shadow-button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <Chrome className="mr-2 h-4 w-4" />
                Login with Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full shadow-button"
                onClick={handleGoogleSignup}
                disabled={isLoading}
              >
                <Chrome className="mr-2 h-4 w-4" />
                Signup with Google
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-primary-foreground/60 text-sm">
            Secure access to academic administration
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;