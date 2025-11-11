import { LoginForm } from "@repo/ui";

export default function Page() {
  return (
    <div className="flex flex-col justify-center gap-10 items-center w-full min-h-screen bg-secondary-foreground">
      <h1 className="text-[50px] font-bold italic text-secondary">
        Docs Login
      </h1>
      <LoginForm />
    </div>
  );
}
