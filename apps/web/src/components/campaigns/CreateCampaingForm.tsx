import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/clerk-react";

export const CreateCampaingForm = ({ setCampaignForm }: { setCampaignForm: (campaignForm: boolean) => void }) => {
  return (
    <div className="mt-16">
      <div className="w-[80%] mx-auto mt-4">
        <CampaignForm setCampaignForm={setCampaignForm} />
      </div>
    </div>
  );
};

const profileFormSchema = z.object({
  name: z.string().max(160).min(4),
  subject: z.string().max(160).min(4),
  description: z.string().max(160).min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const CampaignForm = ({ setCampaignForm }: { setCampaignForm: (campaignForm: boolean) => void }) => {
  const { getToken } = useAuth();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  async function onSubmit(formValues: ProfileFormValues) {
    const { name, subject, description } = formValues;
    console.log(name, subject, description);

    try {
      const token = await getToken();
      console.log(token);
      const response = await fetch(
        "http://localhost:5000/api/campaigns/createCampaign",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, subject, description }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (data.code === 201) {
        toast({
            title: "Campaign created",
        });
        setCampaignForm(false);
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-xl space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Name</FormLabel>
              <FormControl>
                <Input placeholder="campaign name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your campaign.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="subject name" {...field} />
              </FormControl>
              <FormDescription>
                This is the subject of your campaign.
              </FormDescription>
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
                  placeholder="Tell us a little bit about your campaign"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the description of your campaign.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Campaign</Button>
      </form>
    </Form>
  );
};
