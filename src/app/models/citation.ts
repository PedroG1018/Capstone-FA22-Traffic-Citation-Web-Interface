import { formatDate } from "@angular/common";

export class Citation {
    citation_id?: number;
    driver_id?: number;
    user_id?: number;
    type = "";
    date = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    time = new Date().toTimeString().slice(0,5); // Could change locale instead of slicing
    owner_fault = Boolean;
    desc = "";
    violation_loc = "";
    sign_date = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    vin = "";
    vin_state = "";
    code_section = "";
    officer_name = "";
    officer_badge = "";
}