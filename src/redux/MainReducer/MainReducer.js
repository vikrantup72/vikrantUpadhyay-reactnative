import { useNavigation } from '@react-navigation/native';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import { useDispatch } from 'react-redux';
import { Api_url, End_Point_url, token } from '../../API_Url/Api';

export const GetProducts = createAsyncThunk('GetProducts', async  thunkAPI=> {
    try {
        var requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        };
        const response = await fetch(`${Api_url}${End_Point_url.getProducts}`, requestOptions);
        let data = await response.json();
        if (response.status === 200) {
            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch (e) {
        console.log('Error', e.response.data);
        thunkAPI.rejectWithValue(e.response.data);
    }
  }
  );

  export const GetProductsById = createAsyncThunk('GetProductsById', async(id, thunkAPI)=> {

    try {
        var requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        };
        const response = await fetch(`${Api_url}${End_Point_url.getProducts}/${id}`, requestOptions);
        let data = await response.json();
        console.log(data,"llolo");
        if (response.status === 200) {
            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch (e) {
        console.log('Error', e.response.data);
        thunkAPI.rejectWithValue(e.response.data);
    }
  }
  );



  export const GetCategory = createAsyncThunk('GetCategory', async  thunkAPI=> {
    try {
        var requestOptions = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        };
        const response = await fetch(`${Api_url}${End_Point_url.getCategory}`, requestOptions);
        let data = await response.json();
        if (response.status === 200) {
            return data;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
    } catch (e) {
        console.log('Error', e.response.data);
        thunkAPI.rejectWithValue(e.response.data);
    }
  }
  );

  export const UploadProducts = createAsyncThunk('UploadProducts',async ({title, description,Cate,imagelink,price,DeveloperEmail,navigation}, thunkAPI) => {
    console.log(title);    
    try {
            var requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "name": title,
                    "price": price,
                    "category": Cate,
                    "description": description,
                    "avatar": imagelink,
                    "developerEmail":DeveloperEmail
                })
            };
            console.log("nama");
            const response = await fetch(`${Api_url}${End_Point_url.getProducts}`,requestOptions);
            let data = await response.json();
            console.log('response', data);
            if (response.status === 201 || 200) {
                ToastAndroid.show("Product uploaded successfully!",2000)
                return data; 
            } else {
                ToastAndroid.show("Something went wrong!",2000)
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);




  export const UpaymentsData = createSlice({
    name: 'UpaymentsData',
    initialState: {
      isFetching: false,
      isSuccess: false,
      isFetchings:false,
      isError: false,
      ProductList:[],
      CategoryList:'',
      ProductDetails:''
    },
    reducers: {
      clearState: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isFetching = false;
        return state;
      },
    },
    extraReducers: {


        // Product list
        [GetProducts.fulfilled]: (state, { payload }) => {
          state.isFetchings = false;
          state.isSuccess = true;
          state.isError=false
          state.ProductList = payload.products
       
  
        },
        [GetProducts.pending]: (state) => {
          state.isFetchings = true;
          state.isSuccess=false;
          state.isError=false
        },
        [GetProducts.rejected]: (state) => {
          state.isFetchings = false;
          state.isSuccess=false;
          state.isError = true;
        },

        //GetProductsById

        [GetProductsById.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.isError=false
            state.ProductDetails = payload.product
         
    
          },
          [GetProductsById.pending]: (state) => {
            state.isFetching = true;
            state.isSuccess=false;
            state.isError=false
          },
          [GetProductsById.rejected]: (state) => {
            state.isFetching = false;
            state.isSuccess=false;
            state.isError = true;
          },

        // CategoryList


        [GetCategory.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.isError=false
            state.CategoryList = payload.categories
            clearState()
         
    
          },
          [GetCategory.pending]: (state) => {
            state.isFetching = true;
            state.isSuccess=false;
            state.isError=false
          },
          [GetCategory.rejected]: (state) => {
            state.isFetching = false;
            state.isSuccess=false;
            state.isError = true;
          },
  
        //   UploadProducts

        [UploadProducts.fulfilled]: (state,{payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.isError=false
            state.ProductList = [...state.ProductList, payload.product]
          },
          [UploadProducts.pending]: (state) => {
            state.isFetching = true;
            state.isSuccess=false;
            state.isError=false
          },
          [UploadProducts.rejected]: (state) => {
            state.isFetching = false;
            state.isSuccess=false;
            state.isError = true;
          },
    },
  });
  
  export const { clearState } = UpaymentsData.actions;
  export default UpaymentsData.reducer
