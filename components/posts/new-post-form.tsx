// "use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { voices } from "@/config/voices";
import { createPrivatePost, createPublicPost } from "@/actions/create-post";
import { useTranslation } from "react-i18next";

interface NewPostFormProps {
  className?: string;
  isPrivate: boolean;
}

export function NewPostForm({ className, isPrivate }: NewPostFormProps) {
  const { t } = useTranslation();

  const FormSchema = z.object({
    voice: z.string({
      required_error: t("form.z_select_voice"),
    }),
    text: z
      .string()
      .min(5, {
        message: t("form.z_minimum_text_size"),
      })
      .max(100, {
        message: t("form.z_maximum_text_size"),
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: t("form.toast_title"),
      description: (
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-1">
            <span className="font-bold">{t("form.voice_label")}:</span>
            <span className="">{data.voice}</span>
          </div>
          <div className="flex flex-row gap-1">
            <span className="font-bold">{t("form.text_label")}:</span>
            <span className="">{data.text}</span>
          </div>
        </div>
      ),
    });

    if (isPrivate) {
      createPrivatePost(data.voice, data.text);
    } else {
      createPublicPost(data.voice, data.text);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col space-y-6", className)}
      >
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("form.voice_label")}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w- justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? voices.find((voice) => voice.value === field.value)
                            ?.label
                        : t("form.voice_placeholder")}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder={t("form.search_voice_placeholder")}
                    />
                    <CommandEmpty>{t("form.no_voice_found")}</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-[24rem] w-full whitespace-nowrap">
                        {voices.map((voice, idx) => (
                          <CommandItem
                            value={voice.label}
                            key={voice.value + idx}
                            onSelect={() => {
                              form.setValue("voice", voice.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                voice.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {voice.label}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>{t("form.voice_description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.text_label")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("form.text_placeholder")}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>{t("form.text_description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-fit">
          {t("form.submit")}
        </Button>
      </form>
    </Form>
  );
}
