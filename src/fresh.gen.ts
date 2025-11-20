// src/fresh.gen.ts
import * as $0 from "./routes/admin/topup.tsx";
import * as $1 from "./routes/balance.tsx";

const manifest = {
  routes: {
    // Relative paths are correct now because routes/ is also inside src/
    "./routes/admin/topup.tsx": $0,
    "./routes/balance.tsx": $1,
  },
  islands: {},
  baseUrl: import.meta.url,
};

export default manifest;
