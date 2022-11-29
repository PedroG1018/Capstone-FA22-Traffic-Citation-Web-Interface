import { formatDate } from "@angular/common";

export class Driver {
    driver_id?: number;
    driver_name = "";
    date_birth = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    sex = '';
    hair = "";
    eyes = "";
    height = "";
    weight?: number;
    race = "";
    address = "";
    city = "";
    state = "";
    zip?: number;
    license_no = "";
    license_class = '';
}

