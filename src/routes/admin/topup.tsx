/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { topUpUserBalance } from "../../../utils/db.ts"; // <--- Path is correct now

export const handler: Handlers = {
  async POST(req, ctx) {
    const formData = await req.formData();
    const userId = formData.get("userId") as string;
    const amountStr = formData.get("amount") as string;
    const amount = parseFloat(amountStr);

    if (userId && amount > 0) {
      const success = await topUpUserBalance(userId, amount);
      if (success) {
        return new Response(null, {
          status: 303,
          headers: { location: `/admin/topup?success=true&user=${userId}` },
        });
      }
    }

    return new Response(null, {
      status: 303,
      headers: { location: `/admin/topup?error=true` },
    });
  },
};

export default function AdminTopUpPage(props: PageProps) {
  const params = new URLSearchParams(props.url.search);
  const success = params.get("success");
  const error = params.get("error");
  const user = params.get("user");

  return (
    <div class="p-6 mx-auto max-w-lg bg-white shadow-xl rounded-xl mt-10">
      <h1 class="text-3xl font-bold text-red-700 mb-6 border-b pb-2">ADMIN: User Top-Up</h1>
      
      {success && (
        <p class="bg-green-100 text-green-700 p-3 mb-4 rounded font-semibold">
          Top-up successful for user: {user}!
        </p>
      )}
      {error && (
        <p class="bg-red-100 text-red-700 p-3 mb-4 rounded font-semibold">
          Error: Failed to top up balance.
        </p>
      )}

      <form method="POST" class="space-y-4">
        <div>
          <label for="userId" class="block text-sm font-medium text-gray-700">User ID (or Username):</label>
          <input 
            type="text" 
            id="userId" 
            name="userId" 
            required 
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
            placeholder="e.g., player123"
          />
        </div>
        
        <div>
          <label for="amount" class="block text-sm font-medium text-gray-700">Amount to Top-Up (MMK):</label>
          <input 
            type="number" 
            id="amount" 
            name="amount" 
            required 
            min="1"
            step="1"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
            placeholder="e.g., 5000"
          />
        </div>
        
        <button 
          type="submit" 
          class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Confirm Top-Up
        </button>
      </form>
    </div>
  );
}
