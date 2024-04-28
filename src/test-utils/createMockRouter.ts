import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function createMockRouter(
  router: Partial<AppRouterInstance>
): AppRouterInstance {
  return {
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    ...router,
  };
}
