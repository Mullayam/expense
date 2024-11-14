import { useForm } from 'react-hook-form';

interface FormInputs {
    label: string;
    category: string;
    amount: number;
}

export default function IncomeSourceForm() {
    const {
      
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormInputs>(

        {
            defaultValues: {
                label: '',
                category: '',
                amount: 0,
            },
        }
    );

    const onSubmitForm = (data: FormInputs) => {
        console.log(data);
        reset();
    };

    return (
        <div className="max-w-md w-full mx-auto  p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Add an Income Source</h2>
            <p className="text-gray-400 text-sm mb-6">Adds on to your current income / budget amount.</p>

            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="mb-4">
                    <label htmlFor="label" className="block text-gray-900 mb-2">
                        Label <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register("label", {
                            required: "Label is required",
                            minLength: { value: 2, message: "Label must be at least 2 characters" }
                        })}
                        type="text"
                        id="label"
                        placeholder="Ex: Christmas bonus"
                        className={`w-full  text-gray-900 border ${errors.label ? 'border-red-500' : 'border-gray-700'} rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.label && (
                        <p className="text-red-500 text-sm mt-1">{errors.label.message}</p>
                    )}
                </div>

                <div className="mb-6">
                    <label htmlFor="amount" className="block text-gray-900 mb-2">
                        Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register("amount", {
                            required: "Amount is required",
                            min: { value: 0, message: "Amount must be positive" },
                            valueAsNumber: true
                        })}
                        type="number"
                        id="amount"
                        placeholder="Ex: 3000"
                        className={`w-full  text-black border ${errors.amount ? 'border-red-500' : 'border-gray-700'} rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.amount && (
                        <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                    )}
                </div>
                {/* <div className="mb-6">

                    <FormField
                        control={control}
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
                                        {categories["income"].map((category) => (
                                            <SelectItem key={category} value={category.toLowerCase()}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div> */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                >
                    Add To Budget
                </button>
            </form>
        </div>
    );
}