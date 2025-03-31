import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App222222" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1>
            Welcome to <span className="">Remix</span>
          </h1>
          <Button>CLICK!</Button>
        </header>
      </div>
    </div>
  );
}