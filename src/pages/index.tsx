import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.getAll"]);
  const create = trpc.useMutation(["example.create"]);
  const del = trpc.useMutation(["example.delete"]);
  const utils = trpc.useContext();
  const { data: session } = useSession();
  const [name, setName] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    create.mutate(
      { text: name },
      {
        onSettled: () => {
          setName("");
          utils.invalidateQueries(["example.getAll"]);
        },
      }
    );
  };

  const handleDelete = async (id: string) => {
    console.log("[DELETE]", id);
    del.mutate(
      { id },
      {
        onSettled: () => {
          return utils.invalidateQueries(["example.getAll"]);
        },
      }
    );
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta content="Generated by create-t3-app" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="container mx-auto flex h-screen flex-col items-center  px-4 py-8">
        <h1 className="text-5xl font-extrabold  text-gray-700 md:text-[5rem]">
          {`Create `}
          <span className="text-purple-300">T3</span>

          {` App`}
        </h1>
        <p className="text-2xl text-slate-600">Leave a message</p>
        {session?.user ? (
          <div className="flex flex-col items-center">
            <p>{`Hello, ${session.user.name}`}</p>
            <button
              onClick={() => {
                return signOut();
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              return signIn("github");
            }}
          >
            Sign In
          </button>
        )}
        <form className="mt-8" onSubmit={handleSubmit}>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="messsage"
          >
            Message:
          </label>
          <input
            className="rounded-lg border-2 border-gray-500 bg-slate-100 py-2 px-4 text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
            id="messsage"
            value={name}
            onChange={handleChange}
          />
        </form>
        <div className="flex w-full flex-col items-center justify-center gap-4 pt-6 text-3xl text-slate-600">
          {hello.data?.map((item) => {
            return (
              <div key={item.id} className="flex gap-4">
                <p>{item.text}</p>
                {session?.user ? (
                  <button
                    className="rounded-lg bg-red-100 px-4 py-2 text-sm font-bold  text-red-500 hover:bg-red-300"
                    onClick={() => {
                      return handleDelete(item.id);
                    }}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
