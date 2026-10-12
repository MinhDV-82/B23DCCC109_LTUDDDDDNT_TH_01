import { Subject, ScheduleItem, Assignment, GradeItem } from "../types";

export type MainTabParamList = {
    HomeTab: undefined;
    SubjectsTab: undefined;
    ScheduleTab: undefined;
    AssignmentsTab: undefined;
    ProfileTab: undefined;
}

export type RootStackParamList = {
    
    MainTabs: undefined;
    SubjectDetails: { subject: Subject };
    ScheduleDetails: { scheduleItem: ScheduleItem };
    AssignmentDetails: { assignment: Assignment };
    GradeDetails: { gradeItem?: GradeItem } | undefined;

}