import React from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const ReusableTable = ({ columns, data, actions }) => {
  return (
    <Card className="overflow-hidden py-0">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              {columns.map((col, idx) => (
                <TableHead
                  key={idx}
                  className={cn(
                    "text-primary-foreground font-medium uppercase tracking-wider",
                    col.align === "right" && "text-right"
                  )}
                >
                  {col.header}
                </TableHead>
              ))}

              {actions && (
                <TableHead className="text-primary-foreground text-right font-medium uppercase tracking-wider">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-muted/50">
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={cn(col.align === "right" && "text-right")}
                  >
                    <div className="text-sm">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </div>
                  </TableCell>
                ))}

                {actions && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-3">
                      {actions.map((action, idx) =>
                        action.render ? (
                          <div key={idx}>{action.render(row)}</div>
                        ) : (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => action.onClick(row)}
                            className={cn(
                              "inline-flex items-center text-sm font-medium transition-colors hover:text-primary",
                              action.className
                            )}
                          >
                            {action.icon && <action.icon className="mr-1.5" />}
                            {action.label}
                          </button>
                        )
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default ReusableTable;
