// import React from 'react'
import { revalidatePath } from 'next/cache'
import prisma from '../db'
import { create, deleteItem, edit } from '../action'

import SaveButton from '../components/Savebutton'
import DeleteButton from '../components/DeleteButton'
import FormElement from '../components/Form'

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
export default async function BetteerExample() {
    
    const data = await getData()
  
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="border rounded-lg shadow-xl p-10 w-[100vw]">
                <FormElement />
  
                <div className="mt-5 flex flex-col gap-y-2">
                  { data.map((todo) => (
                    // <p key={todo.id}>{todo.input}</p>
                    <div key={todo.id} className="w-full h-full flex items-center">    
                        <form className="flex" action={edit}>
                          <input type="hidden" name="inputId" value={todo.id} />
                          <input 
                            type="text"
                            name="input"
                            defaultValue={todo.input}
                            className="border p-1"
                          />&nbsp;&nbsp;&nbsp;  
  
                          {/* <button type="submit" className="border bg-green-400 rounded-md">Save</button>&nbsp;&nbsp; */}

                          <SaveButton />&nbsp;&nbsp;
                        </form>
                        <form action={deleteItem}>
                            <input type="hidden" name="inputId" value={todo.id} />		
                          {/* <button formAction={deleteItem} className="border bg-red-400 rounded-md">Delete</button> */}

                          <DeleteButton />
                      </form>
                      </div> 
                  ))}
                </div>
            </div>
        </div>
    )
}
