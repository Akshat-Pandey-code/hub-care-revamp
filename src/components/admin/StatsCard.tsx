
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: React.ReactNode;
}

const StatsCard = ({ title, value, icon, description }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-purple-100 p-1.5 text-purple-700">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
