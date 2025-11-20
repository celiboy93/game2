/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getUserBalance } from "../utils/db.ts";

const SAMPLE_USER_ID = "guest_user_42";

export const handler: Handlers<{ balance: number }> = {
  async GET(_req, ctx) {
    const balance = await getUserBalance(SAMPLE_USER_ID);
    return ctx.render({ balance });
  },
};

export default function UserBalancePage({ data }: PageProps<{ balance: number }>) {
  return (
    <div class="p-6 mx-auto max-w-md bg-indigo-50 shadow-inner rounded-xl mt-10 text-center">
      <h1 class="text-2xl font-semibold text-gray-800 mb-4">Your Current Wallet Balance</h1>
      <p class="text-sm text-gray-500 mb-2">Displaying balance for user ID: <strong class="text-indigo-600">{SAMPLE_USER_ID}</strong></p>
      
      <div class="bg-indigo-600 text-white p-6 rounded-lg shadow-lg">
        <p class="text-xl">Available Funds:</p>
        <p class="text-5xl font-extrabold mt-1">
          {data.balance.toLocaleString()} MMK
        </p>
      </div>
      
      <p class="mt-6 text-sm text-gray-500">
        <a href="/admin/topup" class="text-red-500 underline hover:text-red-700">Go to Admin Top-Up Page</a> (For testing)
      </p>
    </div>
  );
}
