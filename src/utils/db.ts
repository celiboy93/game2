// src/utils/db.ts
export const kv = await Deno.openKv();

export async function getUserBalance(userId: string): Promise<number> {
  const key = ["user", userId, "balance"];
  const res = await kv.get<number>(key);
  return res.value ?? 0;
}

export async function topUpUserBalance(userId: string, amount: number): Promise<boolean> {
  if (amount <= 0) return false;

  const key = ["user", userId, "balance"];
  let success = false;
  
  while (!success) {
    const userRes = await kv.get<number>(key);
    const currentBalance = userRes.value ?? 0;
    const newBalance = currentBalance + amount;

    const res = await kv.atomic()
      .check(userRes) 
      .set(key, newBalance) 
      .commit();
      
    success = res.ok;
  }
  return true;
}
