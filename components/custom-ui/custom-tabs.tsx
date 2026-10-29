import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export type CustomTabProps = {
  title: string;
  component: React.ComponentType;
};

export default function CustomTabs({ items }: { items: CustomTabProps[] }) {
  const defaultValue = items[0].title;
  return (
    <Tabs defaultValue={defaultValue} className="h min-w-md">
      <TabsList className="mb-4 h-auto w-full gap-4">
        {items.map((elem, index) => {
          return (
            <TabsTrigger
              className="data-active:text-primary hover:text-primary h-auto flex-1 p-3"
              key={index}
              value={elem.title}
            >
              {elem.title}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {items.map((elem, index) => {
        const Component = elem.component || "div";
        return (
          <TabsContent key={index} value={elem.title}>
            <Component />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
