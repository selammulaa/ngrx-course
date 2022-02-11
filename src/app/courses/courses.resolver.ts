import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, finalize, first, tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { loadAllCourses } from "./course.actions";
import { areCoursesLoaded } from "./courses.selectors";


@Injectable()
export class CoursesResolver implements Resolve<any>{

    // to dispatch the loading action only once
    loading = false;

    constructor(private store: Store<AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        
        return this.store
            .pipe(
                select(areCoursesLoaded),
                tap(coursesLoaded => { // tap is for side effects

                    if(!this.loading && !coursesLoaded){
                        this.loading = true;
                        this.store.dispatch(loadAllCourses())
                    }

                }),
                filter(courseLoaded => courseLoaded),
                first(),
                finalize(() => this.loading = false)
            );
    }
}