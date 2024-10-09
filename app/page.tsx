"use client";

import { Control, useFieldArray, useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Cart = {
	name: string;
	amount: number;
};

interface FormValues {
	cart: Cart[];
}

export default function Home() {
	const {
		register,
		formState: { errors },
		control,
	} = useForm<FormValues>({
		defaultValues: {
			cart: [
				{
					name: "",
					amount: 0,
				},
			],
		},
	});
	const { fields, append, prepend, remove } = useFieldArray({
		name: "cart",
		control,
	});

	return (
		<main className="container mx-auto py-8 flex items-center justify-center">
			<form className="max-w-screen-sm">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							Form Tutorial with Zod Validation
						</CardTitle>
					</CardHeader>
					<CardContent className="grid space-y-3">
						{fields.map((field, index) => {
							return (
								<div
									key={field.id}
									className="flex items-center space-x-3"
								>
									{/* Name */}
									<div>
										<Label className="text-lead font-semibold">
											Name
										</Label>
										<Input
											placeholder="Name"
											{...register(`cart.${index}.name`)}
										/>
									</div>
									{/* Amount */}
									<div>
										<Label className="text-lead font-semibold">
											Amount
										</Label>
										<Input
											type="number"
											placeholder="Amount"
											{...register(
												`cart.${index}.amount`,
												{ valueAsNumber: true }
											)}
										/>
									</div>
								</div>
							);
						})}

						{/* Buttons for RFH */}
						<div className="flex items-center space-x-3">
							<Button
								type="button"
								onClick={() => append({ name: "append", amount: 0 })}
							>
								Append
							</Button>
							<Button
								type="button"
								variant={"secondary"}
								onClick={() => prepend({ name: "pre-pend", amount: 0 })}
							>
								Prepend
							</Button>
						</div>
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full">
							Submit
						</Button>
					</CardFooter>
				</Card>
			</form>
		</main>
	);
}
