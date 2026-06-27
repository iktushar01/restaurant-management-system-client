import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageLayout from "@/Shared/PageLayout/PageLayout";
import { ErrorBanner } from "@/Shared/ErrorBanner/ErrorBanner";

const FormPageShell = ({
  backTo,
  backLabel = "Back",
  title,
  subtitle,
  error,
  children,
  footer,
  onSubmit,
  className,
}) => {
  const content = (
    <>
      {backTo && (
        <Button variant="outline" render={<Link to={backTo} />} className="mb-6">
          <ArrowLeftIcon />
          {backLabel}
        </Button>
      )}

      <Card className={className}>
        <CardHeader className="bg-primary text-primary-foreground border-b">
          <CardTitle className="text-2xl">{title}</CardTitle>
          {subtitle && (
            <CardDescription className="text-primary-foreground/80">
              {subtitle}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <ErrorBanner message={error} />
          {children}
        </CardContent>

        {footer && <CardFooter className="border-t bg-muted/30 px-6 py-4">{footer}</CardFooter>}
      </Card>
    </>
  );

  if (onSubmit) {
    return (
      <PageLayout className="max-w-7xl">
        <form onSubmit={onSubmit}>{content}</form>
      </PageLayout>
    );
  }

  return <PageLayout className="max-w-7xl">{content}</PageLayout>;
};

export default FormPageShell;
