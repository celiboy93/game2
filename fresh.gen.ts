// fresh.gen.ts
import * as $0 from "./routes/admin/topup.tsx";
import * as $1 from "./routes/balance.tsx";

const manifest = {
  routes: {
    // Attempting to use the full path expected by the error
    "file:///src/routes/admin/topup.tsx": $0,
    "file:///src/routes/balance.tsx": $1,
  },
  islands: {},
  baseUrl: import.meta.url,
};

export default manifest;
