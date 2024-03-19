import { createEntityAdapter,createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const paymentsAdapter = createEntityAdapter();

const initialState = paymentsAdapter.getInitialState();

 
export const paymentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      getPayments: builder.query({
          query: () => '/payments',
          validateStatus: (response, result) => {
              return response.status === 200 && !result.isError
          },
          
          transformResponse: responseData => {
              const loadedPayments = responseData.map(payment => {
                payment.id = payment._id
                  return payment
              });
              return paymentsAdapter.setAll(initialState, loadedPayments)
          },
          providesTags: (result, error, arg) => {
              if (result?.ids) {
                  return [
                      { type: 'Payment', id: 'LIST' },
                      ...result.ids.map(id => ({ type: 'Payment', id }))
                  ]
              } else return [{ type: 'Payment', id: 'LIST' }]
          }
      }),
      addNewPayment: builder.mutation({
          query: initialPaymentData => ({
              url: '/payments',
              method: 'POST',
              body: {
                  ...initialPaymentData,
              }
          }),
          invalidatesTags: [
              { type: 'Payment', id: "LIST" }
          ]
      }),
      updatePayment: builder.mutation({
          query: initialPaymentData => ({
              url: '/payments',
              method: 'PATCH',
              body: {
                  ...initialPaymentData,
              }
          }),
          invalidatesTags: (result, error, arg) => [
              { type: 'Payment', id: arg.id }
          ]
      }),
      deletePayment: builder.mutation({
          query: ({ id }) => ({
              url: `/payments`,
              method: 'DELETE',
              body: { id }
          }),
          invalidatesTags: (result, error, arg) => [
              { type: 'Payment', id: arg.id }
          ]
      }),
  }),
})

export const {
  useGetPaymentsQuery,
useAddNewPaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentsApiSlice

// returns the query result object
export const selectPaymentsResult =  paymentsApiSlice.endpoints.getPayments.select()

// creates memoized selector
const selectPaymentsData = createSelector(
  selectPaymentsResult,
  paymentsResult => paymentsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPayments,
  selectById: selectPaymentById,
  selectIds: selectPaymentIds
  // Pass in a selector that returns the users slice of state
} = paymentsAdapter.getSelectors(state => selectPaymentsData(state) ?? initialState)