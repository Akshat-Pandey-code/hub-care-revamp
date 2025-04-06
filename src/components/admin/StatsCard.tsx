
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  trendType: "up" | "down";
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, trend, trendType, icon }: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className="p-2 rounded-full bg-gray-50">{icon}</div>
        </div>
        <div className="mt-2 flex items-center">
          {trendType === "up" ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span 
            className={`text-sm font-medium ${
              trendType === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend}
          </span>
          <span className="text-xs text-gray-500 ml-1">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
