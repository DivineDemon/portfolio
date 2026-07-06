import { FileQuestion } from "lucide-react";

import {
  ErrorState,
  ErrorStateActions,
  GoHomeButton,
} from "@/components/ui/error-state";

export default function NotFound() {
  return (
    <ErrorState
      icon={FileQuestion}
      title="Page not found"
      description="The page you're looking for doesn't exist or may have been moved."
      action={
        <ErrorStateActions>
          <GoHomeButton />
        </ErrorStateActions>
      }
    />
  );
}
