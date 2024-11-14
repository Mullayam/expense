
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { apiHandlers } from "@/lib/api/instance"

const formSchema = z.object({
    category: z.string().min(2, {
        message: "Category must be at least 2 characters.",
    }),
    type: z.enum(["expense", "income"], {
        required_error: "You need to select a type.",
    }),
})

export function ExpenseCategoryManager() {
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => apiHandlers.addExpenseCategory(values)
    })
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values, {
            onSuccess({ data }) {
                if (!data.success) {
                    toast({
                        title: data.message,
                        variant: "destructive",
                    })
                    return
                }
                toast({
                    title: data.message,
                })
                form.reset();
            }
        })

    }

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <div className="space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter category" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a category for your income or expense.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="expense" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Expense
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="income" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Income
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending}>Submit</Button>
                    </form>
                </Form>
            </div>
        </div>

    )
}