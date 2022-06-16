import { Injectable } from '@angular/core';
import { faObjectGroup } from '@fortawesome/free-regular-svg-icons';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class FormToJsonService {

  constructor() { }

  public createLoginJson(
    email: string,
    password: string,
    role: string
  ) {
    const loginJson = {
      email: email,
      password: password,
      role: role
    };
    return loginJson;
  }

  public createResiterJson(
    name: string,
    middleName: string,
    lastName: string,
    id: string,
    username: string,
    password: string,
    email: string,
    role: string
  ) {
    const registerJson = {
      name: name,
      middleName: middleName,
      lastName: lastName,
      id: id,
      username: username,
      password: password,
      email: email,
      role: role
    };

    return registerJson;
  }

  public createBaseFormJson(title: string, type: string, laboratoryId: number, start: Date, end: Date): any {
    const baseFormJson = {
      title: title,
      type: type,
      laboratory: laboratoryId,
      start: start,
      end: end
    };
    return baseFormJson;
  }

  public createClassFormJson(teacherId: number, courseId: number) {
    const classFormJson = {
      teacher: teacherId,
      course: courseId
    };
    return classFormJson;
  }

  public createRecurrentFormJson(recurrence: number) {
    const recurrentFormJson = {
      recurrence: recurrence
    };
    return recurrentFormJson;
  }

  public createConfigSemesterJson(start, end) {
    const configSemesterJson = {
      start: start,
      end: end
    }
    return configSemesterJson;
  }

  public createInventoryJson(
    operator: string,
    laboratoryId: number,
    completeComputers: number,
    incompleteComputers: number,
    projectors: number,
    chairs: number,
    extinguishers: number) {
    const inventoryJson = {
      operator: operator,
      laboratory: laboratoryId,
      completeComputers: completeComputers,
      incompleteComputers: incompleteComputers,
      projectors: projectors,
      chairs: chairs,
      extinguishers: extinguishers
    };
    return inventoryJson;
  }

  public createNewHoursJson(
    date: string,
    start: string,
    end: string
  ) {
    const hoursJson = {
      date: date,
      start: start,
      end: end
    };

    return hoursJson;
  }

  public createEditHoursJson(
    id: number,
    date: string,
    start: string,
    end: string
  ) {
    const hoursJson = {
      date: date,
      start: start,
      end: end
    };

    return hoursJson;
  }

  public createFailuresJson(
    operator: string,
    dateTime: string,
    laboratoryId: number,
    asset: string,
    description: string
  ) {
    const failuresJson = {
      operator: operator,
      dateTime: new Date(dateTime),
      laboratory: laboratoryId,
      asset: asset,
      description: description
    }

    return failuresJson;
  }

  public createAddUserJson(
    name: string,
    middleName: string,
    lastName: string,
    id: string,
    userName: string
  ) {
    const addUserJson = {
      name: name,
      middleName: middleName,
      lastName: lastName,
      id: parseInt(id, 10),
      userName: userName
    }

    return addUserJson;
  }

  public createAddCourseJson(
    code: string,
    name: string
  ) {
    const addCourseJson = {
      code: code,
      name: name
    };
    return addCourseJson;
  }

  public createFailureStatesJson(state: string) {
    const failureStatesJson = {
      state: state
    };
    return failureStatesJson;
  }

  public createUpdateProfileJson(
    userId: number,
    name: string,
    middleName: string,
    lastName: string,
    email: string) {
    const updateProfileJson = {
      id: userId,
      name: name,
      middleName: middleName,
      lastName: lastName,
      email: email
    };
    return updateProfileJson;
  }

  public createDayAvailabilityJson(
    dayId: number,
    start: string,
    end: string
  ) {
    const dayAvailabilityJson = {
      dayId: dayId,
      start: start,
      end: end
    };
    return dayAvailabilityJson;
  }
}
