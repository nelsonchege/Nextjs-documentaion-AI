"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const asAIQuestion = async (prompt: string) => {
    const payload = {
      prompt,
    };
    const { data } = await axios.post("/api/subneddit", payload);
  };
  const handleIndexandEmbeddings = async () => {
    setIsLoading(true);
    const { data } = await axios.post("/api/setup");
    console.log("data --->", data);
    toast.success("Index created Successfull");
    setIsLoading(false);
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className=" font-extrabold text-2xl mb-3">nextjs documentation</h1>
      <div className="w-2/3">
        <form className="flex flex-col justify-center items-center gap-3">
          <Input
            type="text"
            name="prompt"
            placeholder="ask a question"
            className="shadow-md hover:shadow-lg transition duration-200 ease-in-out"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            onClick={() => asAIQuestion(prompt)}
            className="mt-3 w-1/3 hover:bg-secondary hover:text-black hover:border hover:border-black transition duration-300 ease-in-out"
          >
            Ask a question
          </Button>
        </form>
      </div>

      {isLoading ? (
        <div className="mt-auto">
          <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <Button
          disabled={isLoading}
          className="mt-auto w-1/5 hover:bg-secondary hover:text-black hover:border hover:border-black"
          onClick={() => handleIndexandEmbeddings()}
        >
          <span className="m-3">create Index and Embedings</span>
        </Button>
      )}
    </main>
  );
}
