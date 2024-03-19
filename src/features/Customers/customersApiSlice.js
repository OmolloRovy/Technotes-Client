import { createEntityAdapter,createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const customersAdapter = createEntityAdapter();

const initialState = customersAdapter.getInitialState();
 
export const customersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      getCustomers: builder.query({
          query: () => '/customers',
          validateStatus: (response, result) => {
              return response.status === 200 && !result.isError
          },
          
          transformResponse: responseData => {
              const loadedCustomers = responseData.map(customer => {
                  customer.id = customer._id
                  return customer
              });
              return customersAdapter.setAll(initialState, loadedCustomers)
          },
          providesTags: (result, error, arg) => {
              if (result?.ids) {
                  return [
                      { type: 'Customer', id: 'LIST' },
                      ...result.ids.map(id => ({ type: 'Customer', id }))
                  ]
              } else return [{ type: 'Customer', id: 'LIST' }]
          }
      }),
      addNewCustomer: builder.mutation({
        query: (initialCustomerData) => ({
          url: '/customers',
          method: 'POST',
          body: {
            ...initialCustomerData,
          },
        }),
        // Add preFetch logic here
        onQueryStarted: async (api, { data }) => {
          console.log("Initial Customer Data:", data); // Log initialCustomerData here
        },
        invalidatesTags: [
          { type: 'Customer', id: "LIST" }
        ]
      }),
      updateCustomer: builder.mutation({
          query: initialCustomerData => ({
              url: '/customers',
              method: 'PATCH',
              body: {
                  ...initialCustomerData,
              }
          }),
          invalidatesTags: (result, error, arg) => [
              { type: 'Customer', id: arg.id }
          ]
      }),
      deleteCustomer: builder.mutation({
          query: ({ id }) => ({
              url: `/customers`,
              method: 'DELETE',
              body: { id }
          }),
          invalidatesTags: (result, error, arg) => [
              { type: 'Customer', id: arg.id }
          ]
      }),
  }),
})

export const {
  useGetCustomersQuery,
  useAddNewCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApiSlice

// returns the query result object
export const selectCustomersResult = customersApiSlice.endpoints.getCustomers.select()

// creates memoized selector
const selectCustomersData = createSelector(
  selectCustomersResult,
  customersResult => customersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllCustomers,
  selectById: selectCustomerById,
  selectIds: selectCustomerIds
  // Pass in a selector that returns the customers slice of state
} = customersAdapter.getSelectors(state => selectCustomersData(state) ?? initialState)