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
import { Plus, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";

type Cart = {
	name: string;
	amount: number;
};

interface FormValues {
	cart: Cart[];
}

export default function Home() {
	const {
		handleSubmit,
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
		rules: {
			required: 'Please append at least 1 item',
		}
	});

	const onSubmit = (data) => {
		console.log(data)
	}

	return (
		<main className="container mx-auto py-8 flex items-center justify-center">
			<form className="max-w-screen-sm" onSubmit={handleSubmit(onSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl font-semibold">
							Form Tutorial with Zod Validation
						</CardTitle>
					</CardHeader>
					<CardContent className="grid space-y-3">
						{fields.map((field, index) => {
							return (
								<Fragment key={field.id}>
									<div className="flex items-center space-x-3">
										<div className="flex space-x-3">
											{/* Name */}
											<div>
												<Label className="text-lead font-semibold">
													Name
												</Label>
												<Input
													placeholder="Name"
													{...register(
														`cart.${index}.name`
													)}
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
										<div className="h-full flex justify-end items-end">
											<Button
												variant={"destructive"}
												size={"sm"}
												type="button"
												onClick={() => remove(index)}
												className="rounded-full p-2 "
											>
												<Trash className="w-4 h-4" />
											</Button>
										</div>
									</div>
									{index !== fields.length - 1 && (
										<Separator className="my-4" />
									)}
								</Fragment>
							);
						})}

						<p className="text-sm text-destructive">{errors.cart?.root?.message}</p>

						{/* Buttons for RFH */}
						<div className="flex items-center space-x-3">
							<Button
								type="button"
								onClick={() =>
									append({ name: "append", amount: 0 })
								}
							>
								Append
							</Button>
							<Button
								type="button"
								variant={"secondary"}
								onClick={() =>
									prepend({ name: "pre-pend", amount: 0 })
								}
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
