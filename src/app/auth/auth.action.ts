import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

export const login = createAction(
    "[Login Page] User Login",  // source 
    props<{user: User}>()
)

export const logout = createAction(
    "[Top Menu] Logout"
)