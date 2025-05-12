export type Payment = {
  id: string;
  contractor: string;
  amount: number;
  date: Date;
  isRecurring: boolean;
  userId: string;
  createdAt?: Date;
  // Add other fields as needed
};
