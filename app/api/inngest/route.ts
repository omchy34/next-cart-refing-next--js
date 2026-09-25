import { serve } from "inngest/next";
import { inngest } from "../../../inggest/client";
import { syncUserCreation, syncUserDataUpdate, syncUserDeletion } from "@/inggest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserDataUpdate,
    syncUserDeletion,
  ],
});