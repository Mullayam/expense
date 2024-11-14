/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiHandlers } from '@/lib/api/instance';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';


const formSchema = z.object({
    type: z.enum(['expense', 'income']),
    category: z.string().min(1, 'Category is required'),
    amount: z.string().min(1, 'Amount is required'),
    date: z.string().min(1, 'Date is required'),
    description: z.string().min(1, 'Description is required'),
});



export function ExpenseForm() {
    const { toast } = useToast()
    const [categories, setCategories] = useState<{ id: string; name: string, type: string }[]>([])

    const data = useQuery({
        queryKey: ['get-categories'],
        queryFn: async () => {
            const { data } = await apiHandlers.getExpenseCategory()
            setCategories(data.result)
            return data
        },
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: 'expense',
            category: categories[0]?.id || '',
            amount: "0",
            date: new Date().toISOString().split('T')[0],
            description: '',
        },
    });
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => apiHandlers.addNewExpense(values)
    })

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
       
        mutate(values, {
            onSuccess({data}:any) {
                if (!data.success) {
                    toast({
                        title: data.message,
                        variant: "destructive",
                    })
                    return
                }
                form.reset();
            },
        });
    };

    const transactionType = form.watch('type');
    useEffect(() => {

        // if (transactionType) {
          
        //     const oldCategories = catData?.result
        //     const filteredCategories = oldCategories.filter((category) => category.type.toLowerCase() === transactionType.toLowerCase())
        //     console.log(filteredCategories)
        //     setCategories(filteredCategories)
        // }
    }, [transactionType])
    return (
        <Card className='w-[48%]'>
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-600">
                    Add Transaction
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="expense">Expense</SelectItem>
                                            <SelectItem value="income">Income</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toLowerCase()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount (INR)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter amount" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
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
                                        <Textarea placeholder="Enter description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add Transaction
                        </Button>
                      
                    </form>
                </Form>
                <Button onClick={() => form.reset()} className="w-full mt-2 bg-orange-600 hover:bg-orange-700" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Reset Form
                        </Button>
            </CardContent>
        </Card>
    );
}