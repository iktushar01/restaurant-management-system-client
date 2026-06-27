import React from "react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="mt-8 bg-muted text-muted-foreground">
      <Separator />
      <div className="px-4 py-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Restaurant Management System</p>
      </div>
    </footer>
  );
};

export default Footer;
