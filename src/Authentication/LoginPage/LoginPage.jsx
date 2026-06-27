import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  InfoIcon,
  LockIcon,
  UserIcon,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "../../services/authService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.login(email, password);
      navigate("/RestaurantDashboard/Index");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <div className="relative w-full max-w-md space-y-4">
        <div className="flex justify-end">
          <ModeToggle />
        </div>

        <Card className="overflow-hidden border-primary/20 shadow-xl">
          <CardHeader className="bg-primary text-primary-foreground text-center py-6">
            <CardTitle className="text-3xl font-bold tracking-tight">
              DineFlow
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Restaurant Management System
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full group">
                <span>{loading ? "Logging in..." : "Login"}</span>
                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </form>

            <Alert className="mt-6 border-primary/30 bg-primary/5">
              <InfoIcon />
              <AlertTitle>Login Credentials</AlertTitle>
              <AlertDescription>
                Use the super admin email and password from your server{" "}
                <code className="text-foreground">.env</code> file (
                <code className="text-foreground">SUPER_ADMIN_EMAIL</code> /{" "}
                <code className="text-foreground">SUPER_ADMIN_PASSWORD</code>).
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
