import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";

export default function Home() {
  const addProductToDatabase = async (e: FormData) => {
    "use server";
    const prompt = e.get("prompt")?.toString();
    const payload = {
      prompt,
    };
    const { data } = await axios.post("/api/subneddit", payload);
    console.log("ai response ------->", data);
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className=" font-extrabold text-2xl mb-3">nextjs documentation</h1>
      <div className="w-2/3">
        <form
          className="flex flex-col justify-center items-center gap-3"
          action={addProductToDatabase}
        >
          <Input
            type="text"
            name="prompt"
            placeholder="ask a question"
            className="shadow-md hover:shadow-lg transition duration-200 ease-in-out"
          />
          <Button className="mt-3 w-1/3 hover:bg-secondary hover:text-black hover:border hover:border-black transition duration-300 ease-in-out">
            Ask a question
          </Button>
        </form>
      </div>
      <Button className="mt-auto w-1/5 hover:bg-secondary hover:text-black hover:border hover:border-black">
        create Index and Embedings
      </Button>
    </main>
  );
}
