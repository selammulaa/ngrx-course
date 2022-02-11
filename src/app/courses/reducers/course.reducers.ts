import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";
import { compareCourses, Course } from "../model/course";

// disctionary and natural ordere
export interface CoursesState extends EntityState<Course>{
    allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    selectId: course => course.id  // helpful if the id was not named 'id', but this is not useful here 
});

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const coursesReducer = createReducer(
    initialCoursesState,

    on(CourseActions.allCoursesLoaded,
        (state, action) => adapter.setAll(action.courses, 
            {...state, // ... -> shallow copy
                allCoursesLoaded: true
            })), 

    on(CourseActions.courseUpdated, 
        (state, action) => adapter.updateOne(action.update, state))
)

export const {
    selectAll
} = adapter.getSelectors();



