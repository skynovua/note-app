"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { EditableNote, NoteDocument } from "@/types/note";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  body: z.string().min(3, "Content must be at least 3 characters long"),
});

interface NoteFormProps {
  note: NoteDocument | null;
  isLoading?: boolean;
  onSubmit: (note: EditableNote) => Promise<void>;
}

export function NoteForm({ note, isLoading, onSubmit }: NoteFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: note?.title ?? "",
      body: note?.body ?? "",
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.reset({
      title: note?.title ?? "",
      body: note?.body ?? "",
    });
  }, [note, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() =>
      onSubmit(values).then(() => {
        toast.success("Note saved successfully");
      }),
    );
  };

  if (isLoading && !note) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-32 w-full" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-[100px]" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{note ? "Edit Note" : "Create New Note"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Note Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Note Content" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {note ? "Update" : "Create"} Note
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
