import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const todosApi = createApi({

    reducerPath: 'todos',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com'
    }),

    endpoints: (builder) => ({

        getTodos: builder.query({
            query: () => '/todos'
        }), //este es un endpoint que devuelve todos los todoso que obtiene de la peticion

        getTodoById: builder.query({
            query: (todoId) => `/todos/${ todoId }`
        }),//este endpoint devuelve los todos por id

    })

})

export const { useGetTodosQuery, useGetTodoByIdQuery, } = todosApi;

