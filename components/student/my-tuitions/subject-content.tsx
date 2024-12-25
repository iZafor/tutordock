import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Subject } from "@/lib/types";
import { FileText, BookOpen } from "lucide-react";
import { useState } from "react";
import FilterBar from "./filter-bar";
import ResourceList from "./resource-list";
import { Badge } from "@/components/ui/badge";
import TaskCard from "./task-card";

export default function SubjectContent({ subject }: { subject: Subject }) {
    const [activeTab, setActiveTab] = useState("tasks");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    const filteredTasks = subject.tasks.filter((task) => {
        const matchesSearch = task.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || task.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const filteredResources = subject.resources.filter((resource) => {
        const matchesSearch = resource.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesType =
            typeFilter === "all" || resource.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="w-full space-y-6 py-6 ps-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{subject.name}</h1>
                    <p className="text-muted-foreground">
                        {subject.description}
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold">
                        {subject.progress}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Complete
                    </div>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-[400px] grid-cols-2">
                    <TabsTrigger value="tasks" className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Tasks
                    </TabsTrigger>
                    <TabsTrigger
                        value="resources"
                        className="flex items-center"
                    >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Resources
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="tasks" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Tasks</span>
                                <Badge variant="secondary">
                                    {filteredTasks.length} of{" "}
                                    {subject.tasks.length}
                                </Badge>
                            </CardTitle>
                            <FilterBar
                                onSearchChange={setSearchQuery}
                                onStatusChange={setStatusFilter}
                            />
                        </CardHeader>
                        <CardContent>
                            {filteredTasks.length > 0 ? (
                                <div className="space-y-4">
                                    {subject.tasks.map((task) => (
                                        <TaskCard
                                            key={task.id + "-task"}
                                            task={task}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No tasks match your filters
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="resources" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Resources</span>
                                <Badge variant="secondary">
                                    {filteredResources.length} of{" "}
                                    {subject.resources.length}
                                </Badge>
                            </CardTitle>
                            <FilterBar
                                onSearchChange={setSearchQuery}
                                onStatusChange={setTypeFilter}
                                showTypeFilter={true}
                            />
                        </CardHeader>
                        <CardContent>
                            {filteredResources.length > 0 ? (
                                <ResourceList resources={filteredResources} />
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No resources match your filters
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
