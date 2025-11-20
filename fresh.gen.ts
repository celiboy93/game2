// fresh.gen.ts
import * as $0 from "./routes/admin/topup.tsx";
import * as $1 from "./routes/balance.tsx";

const manifest = {
  routes: {
    // We are deliberately using the 'src/' path to match what the Deno Deploy error is showing
    "./src/routes/admin/topup.tsx": $0,
    "./src/routes/balance.tsx": $1,
  },
  islands: {},
  baseUrl: import.meta.url,
};

export default manifest;
