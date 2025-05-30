import mongoose from "mongoose"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getUserData = asyncHandler(async (req, res) => {
   
})

const getUserHistory = asyncHandler(async (req, res) => {
    
})

export {
    getUserData, 
    getUserHistory
    }