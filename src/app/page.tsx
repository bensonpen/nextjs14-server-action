// import Image from 'next/image'

import { revalidatePath } from "next/cache"
import prisma from "./db"

// asyf
async function getData() {
  const data = await prisma.todo.findMany({
      select: {
        input: true,
        id: true,
      },
      orderBy: {
        createdAt: "desc",
      },
  })

  return data
}


// -----------------------------------
export default async function Home() {

  const data = await getData()

  async function create(formData: FormData) {
      "use server"

      const input = formData.get("input") as string

      await prisma.todo.create({
        data: {
          input: input,
        },
      })  

      revalidatePath("/")
  }

  async function edit(formData: FormData) {
      "use server"

      const input = formData.get("input") as string
      const inputId = formData.get("inputId") as string

      await prisma.todo.update({
        where: {
          id: inputId,
        },
        data: {
          input: input,
        }
      })  

      revalidatePath("/")
  }

  async function deleteItem(formData: FormData) {
      "use server"

      const inputId = formData.get("inputId") as string

      await prisma.todo.delete({
        where: {
          id: inputId,
        },
      })  

      revalidatePath("/")
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
        <div className="border rounded-lg shadow-xl p-10 w-[30vw]">
            {/* <h1>hello world !</h1> */}
            <form action={create} className="flex flex-col">
                <label className="text-lg font-bold">Todo: </label>
                <input 
                  type="text" 
                  name="input" 
                  className="border p-1 border-gray-800"
                  placeholder="topic anything..."
                />
                <button
                  type="submit"
                  className="bg-green-500 rounded-lg mt-2 text-white py-2"
                >
                    Submit
                </button>
            </form>

            <div className="mt-5 flex flex-col gap-y-2">
                { data.map((todo) => (
                  // <p key={todo.id}>{todo.input}</p> 
                    <form key={todo.id} action={edit} className="flex">
                        <input type="hidden" name="inputId" value={todo.id} />
                        <input 
                          type="text"
                          name="input"
                          defaultValue={todo.input}
                          className="border p-1"
                        />&nbsp;&nbsp;&nbsp;  

                        <button type="submit" className="border bg-green-400 rounded-md">Save</button>&nbsp;&nbsp;
                        <button formAction={deleteItem} className="border bg-red-400 rounded-md">Delete</button>
                    </form> 
                ))}
            </div>
        </div>
    </div>
  )
}
