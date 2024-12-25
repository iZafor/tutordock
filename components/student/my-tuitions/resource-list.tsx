import { Card, CardContent } from "@/components/ui/card";
import { Resource } from "@/lib/types";
import { FileText, Presentation, Link, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResourceList({ resources }: { resources: Resource[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource) => (
                <Card
                    key={resource.id}
                    className="hover:bg-accent/50 transition-colors"
                >
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                            {resource.type === "document" ? (
                                <FileText className="h-8 w-8 text-blue-500" />
                            ) : resource.type === "video" ? (
                                <Presentation className="h-8 w-8 text-red-500" />
                            ) : (
                                <Link className="h-8 w-8 text-green-500" />
                            )}
                            <div className="flex-1">
                                <div className="font-medium">
                                    {resource.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Added{" "}
                                    {new Date(
                                        resource.dateAdded
                                    ).toLocaleDateString()}
                                </div>
                            </div>
                            <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
