"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Subject } from "@/lib/types";
import { FileText, BookOpen, Plus, Calendar, Upload } from "lucide-react";
import FilterBar from "./filter-bar";
import ResourceList from "./resource-list";
import { Badge } from "@/components/ui/badge";
import TaskCard from "./task-card";
import { usePathname } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { calculateSubjectTaskProgress } from "@/lib/student-analytics-util";

export default function SubjectContent({ subject }: { subject: Subject }) {
    const [activeTab, setActiveTab] = useState("tasks");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
    const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);
    const pathname = usePathname();
    const isTutor = pathname.includes("/tutor");

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
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold">
                        {calculateSubjectTaskProgress(subject)}%
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
                                <div className="flex items-center gap-4">
                                    <Badge variant="secondary">
                                        {filteredTasks.length} of{" "}
                                        {subject.tasks.length}
                                    </Badge>
                                    {isTutor && (
                                        <Dialog
                                            open={isTaskDialogOpen}
                                            onOpenChange={setIsTaskDialogOpen}
                                        >
                                            <DialogTrigger asChild>
                                                <Button size="sm">
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    New Task
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Create New Task
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Add a new task for this
                                                        subject
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <CreateTaskForm
                                                    onSubmit={() =>
                                                        setIsTaskDialogOpen(
                                                            false
                                                        )
                                                    }
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </div>
                            </CardTitle>
                            <FilterBar
                                onSearchChange={setSearchQuery}
                                onStatusChange={setStatusFilter}
                            />
                        </CardHeader>
                        <CardContent>
                            {filteredTasks.length > 0 ? (
                                <div className="space-y-4">
                                    {filteredTasks.map((task) => (
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
                                <div className="flex items-center gap-4">
                                    <Badge variant="secondary">
                                        {filteredResources.length} of{" "}
                                        {subject.resources.length}
                                    </Badge>
                                    {isTutor && (
                                        <Dialog
                                            open={isResourceDialogOpen}
                                            onOpenChange={
                                                setIsResourceDialogOpen
                                            }
                                        >
                                            <DialogTrigger asChild>
                                                <Button size="sm">
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    New Resource
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Add New Resource
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Add a new resource for
                                                        this subject
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <CreateResourceForm
                                                    onSubmit={() =>
                                                        setIsResourceDialogOpen(
                                                            false
                                                        )
                                                    }
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </div>
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

const taskFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "Description is required").max(500),
    dueDate: z
        .date({
            required_error: "Start date is required",
        })
        .min(new Date(), "Start date must be in the future"),
    maxPoints: z
        .number()
        .min(0, "Maximum Points must be at least 0")
        .max(100, "Maximum Points cannot exceed 100")
        .default(0),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

function CreateTaskForm({ onSubmit }: { onSubmit: () => void }) {
    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            title: "",
            description: "",
            maxPoints: 0,
        },
    });
    const [calenderOpen, setCalenderOpen] = useState(false);

    const handleSubmit = (values: TaskFormValues) => {
        console.log(values);
        onSubmit();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter task title"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter task description"
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4 items-baseline">
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1">
                                <FormLabel>Due Date</FormLabel>
                                <Popover open={calenderOpen}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                                onClick={() =>
                                                    setCalenderOpen(
                                                        (prev) => !prev
                                                    )
                                                }
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <CalendarComponent
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(e) => {
                                                field.onChange(e);
                                                setCalenderOpen(false);
                                            }}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="maxPoints"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Maximum Points</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={100}
                                        placeholder="Enter score"
                                        {...field}
                                        onChange={(e) => {
                                            const value = parseInt(
                                                e.target.value
                                            );
                                            field.onChange(
                                                isNaN(value) ? 0 : value
                                            );
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit">Create Task</Button>
                </div>
            </form>
        </Form>
    );
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "video/mp4",
    "video/quicktime",
];

const resourceFormSchema = z
    .object({
        name: z.string().min(1, "Name is required").max(100),
        type: z.enum(["document", "video", "link"]),
        url: z.string().url("Please enter a valid URL").optional(),
        file: z
            .custom<File>()
            .optional()
            .refine(
                (file) => !file || file.size <= MAX_FILE_SIZE,
                "File size should be less than 5MB."
            )
            .refine(
                (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
                "File type must be pdf, word document, powerpoint, mp4, or quicktime"
            ),
    })
    .refine(
        (data) => {
            if (data.type === "link") {
                return !!data.url && !data.file;
            } else {
                return !!data.file && !data.url;
            }
        },
        {
            message: "Please provide either a URL or a file, not both",
            path: ["type"],
        }
    );

type ResourceFormValues = z.infer<typeof resourceFormSchema>;

function CreateResourceForm({ onSubmit }: { onSubmit: () => void }) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<ResourceFormValues>({
        resolver: zodResolver(resourceFormSchema),
        defaultValues: {
            name: "",
            type: "document",
        },
    });

    const handleSubmit = (values: ResourceFormValues) => {
        if (values.type === "link") {
            console.log("Submitting link resource:", values);
        } else {
            const formData = new FormData();
            if (selectedFile) {
                formData.append("file", selectedFile);
                formData.append("name", values.name);
                formData.append("type", values.type);
                console.log("Submitting file resource:", formData);
            }
        }
        onSubmit();
    };

    const resourceType = form.watch("type");

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            form.setValue("file", file);
            form.setValue("url", undefined);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resource Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter resource name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resource Type</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    setSelectedFile(null);
                                    form.setValue("url", undefined);
                                    form.setValue("file", undefined);
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="document">
                                        Document
                                    </SelectItem>
                                    <SelectItem value="video">Video</SelectItem>
                                    <SelectItem value="link">Link</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {resourceType === "link" ? (
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter resource URL"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setSelectedFile(null);
                                            form.setValue("file", undefined);
                                        }}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ) : (
                    <FormField
                        control={form.control}
                        name="file"
                        render={() => (
                            <FormItem>
                                <FormLabel>Upload {resourceType}</FormLabel>
                                <FormControl>
                                    <div className="flex flex-col gap-2">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept={ACCEPTED_FILE_TYPES.join(
                                                ","
                                            )}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                            onClick={handleFileClick}
                                        >
                                            <Upload className="h-4 w-4 mr-2" />
                                            Choose {resourceType} file
                                        </Button>
                                        {selectedFile && (
                                            <div className="text-sm text-muted-foreground">
                                                Selected file:{" "}
                                                {selectedFile.name}
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <div className="flex justify-end space-x-2 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            form.reset();
                            setSelectedFile(null);
                            onSubmit();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={
                            !form.formState.isValid ||
                            (resourceType === "link"
                                ? !form.getValues("url")
                                : !selectedFile)
                        }
                    >
                        Create Resource
                    </Button>
                </div>
            </form>
        </Form>
    );
}
