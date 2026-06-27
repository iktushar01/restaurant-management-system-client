import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  InfoIcon,
  LockIcon,
  LogInIcon,
  UserIcon,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthProvider";
import { IS_RENDER_API, SERVER_WAKE_UP_SECONDS } from "@/constants/apiConfig";
import { ServerWakeUpNotice } from "@/components/ServerWakeUpNotice";
import { ServerWakeUpLoading } from "@/components/ServerWakeUpLoading";
import { getDefaultRouteForRole } from "@/constants/rolePermissions";
import { DEMO_USERS } from "@/constants/demoUsers";
import { authService } from "@/services/authService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoUsers, setDemoUsers] = useState(DEMO_USERS);
  const [quickLoginEmail, setQuickLoginEmail] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    authService
      .getDemoUsers()
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setDemoUsers(response.data);
        }
      })
      .catch(() => {
        setDemoUsers(DEMO_USERS);
      });
  }, []);

  const handleLogin = async (loginEmail, loginPassword) => {
    setError("");
    setLoading(true);

    try {
      const response = await login(loginEmail, loginPassword);
      const userRole = response.data?.user?.role ?? response.data?.role;
      navigate(getDefaultRouteForRole(userRole));
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
      setQuickLoginEmail("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  const handleQuickLogin = async (demoUser) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setQuickLoginEmail(demoUser.email);
    await handleLogin(demoUser.email, demoUser.password);
  };

  if (loading && IS_RENDER_API) {
    return (
      <ServerWakeUpLoading
        message={`Connecting to server… please wait up to ${SERVER_WAKE_UP_SECONDS} seconds`}
      />
    );
  }

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

      <div className="relative w-full max-w-3xl space-y-4">
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
            <ServerWakeUpNotice className="mb-4" />

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
                <span>
                  {loading
                    ? IS_RENDER_API
                      ? `Waking up server (up to ${SERVER_WAKE_UP_SECONDS}s)…`
                      : "Logging in..."
                    : "Login"}
                </span>
                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </form>

            <Alert className="mt-6 border-primary/30 bg-primary/5">
              <InfoIcon />
              <AlertTitle>Demo Accounts</AlertTitle>
              <AlertDescription>
                Use any account below to explore role-based access. All demo passwords are{" "}
                <code className="text-foreground">Demo@123</code> unless your server overrides
                the super admin via <code className="text-foreground">.env</code>.
              </AlertDescription>
            </Alert>

            <div className="mt-4 overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demoUsers.map((demoUser) => (
                    <TableRow key={demoUser.email}>
                      <TableCell>
                        <Badge variant="outline">{demoUser.label}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{demoUser.email}</TableCell>
                      <TableCell className="font-mono text-xs">{demoUser.password}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          disabled={loading && quickLoginEmail === demoUser.email}
                          onClick={() => handleQuickLogin(demoUser)}
                        >
                          <LogInIcon className="size-3.5" />
                          {loading && quickLoginEmail === demoUser.email ? "..." : "Login"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
