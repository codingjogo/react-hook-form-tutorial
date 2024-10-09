'use client';

import { Control, useFieldArray, useForm, useWatch } from 'react-hook-form'

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

export default function Home() {
  const { register, formState: {errors}, control} = useForm({
    defaultValues: {
      cart: [
        {
          name: '',
          amount: '',
        }
      ]
    }
  });
  const { fields } = useFieldArray({
    name: 'cart',
    control,
  })

	return (
		<main className="container mx-auto py-8 flex items-center justify-center">
			<form className="max-w-screen-sm">
      <Card>
				<CardHeader>
					<CardTitle className="text-2xl font-semibold">Form Tutorial with Zod Validation</CardTitle>
				</CardHeader>
				<CardContent className="grid space-y-3">
					<div className="flex items-center space-x-3">
            {/* Name */}
            <div>
              <Label className="text-lead font-semibold">Name</Label>
              <Input placeholder="Name"/> 
            </div>
            {/* Amount */}
            <div>
              <Label className="text-lead font-semibold">Amount</Label>
              <Input placeholder="Amount"/> 
            </div>
          </div>

          {/* Buttons for RFH */}
          <div className="flex items-center space-x-3">
            <Button type="button">Append</Button>
            <Button type="button" variant={'secondary'}>Prepend</Button>
          </div>
				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full">Submit</Button>
				</CardFooter>
			</Card>

      </form>
		</main>
	);
}
